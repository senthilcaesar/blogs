import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Builds a hierarchical tree structure of comments from a flat list.
 * @param {Array} flatComments - Array of comment objects
 * @returns {Array} Array of root comments with nested replies arrays
 */
export function buildCommentTree(flatComments) {
  if (!Array.isArray(flatComments)) return [];

  const commentMap = new Map();
  const rootComments = [];

  // Clone objects and add empty replies array
  flatComments.forEach((item) => {
    commentMap.set(item.id, {
      ...item,
      replies: [],
    });
  });

  // Wire parents and children
  commentMap.forEach((comment) => {
    if (comment.parentId && commentMap.has(comment.parentId)) {
      commentMap.get(comment.parentId).replies.push(comment);
    } else {
      rootComments.push(comment);
    }
  });

  // Sort function to order by timestamp (oldest first)
  const sortByDate = (a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeA - timeB;
  };

  const sortRecursively = (nodes) => {
    nodes.sort(sortByDate);
    nodes.forEach((node) => {
      if (node.replies.length > 0) {
        sortRecursively(node.replies);
      }
    });
  };

  sortRecursively(rootComments);
  return rootComments;
}

/**
 * Subscribes to real-time comment updates for a specific post.
 * Includes graceful fallback if composite index is missing or building.
 * @param {string} postSlug - The blog post slug identifier
 * @param {function} onUpdate - Callback called with (treeComments, totalCount)
 * @param {function} onError - Optional error callback
 * @returns {function} Unsubscribe cleanup function
 */
export function subscribeToComments(postSlug, onUpdate, onError) {
  if (!postSlug) {
    onUpdate([], 0);
    return () => {};
  }

  const handleSnapshot = (snapshot) => {
    const flatList = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        postSlug: data.postSlug,
        parentId: data.parentId ?? null,
        author: data.author || 'Anonymous Reader',
        content: data.content || '',
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : (typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString()),
      };
    });

    const tree = buildCommentTree(flatList);
    onUpdate(tree, flatList.length);
  };

  try {
    const commentsRef = collection(db, 'comments');
    const primaryQuery = query(
      commentsRef,
      where('postSlug', '==', postSlug),
      orderBy('createdAt', 'asc')
    );

    let fallbackUnsub = null;

    const unsub = onSnapshot(
      primaryQuery,
      handleSnapshot,
      (error) => {
        // If composite index is missing or building, fall back to simple equality query
        try {
          const fallbackQuery = query(
            commentsRef,
            where('postSlug', '==', postSlug)
          );
          fallbackUnsub = onSnapshot(
            fallbackQuery,
            handleSnapshot,
            (fallbackErr) => {
              console.error('Firestore fallback query error:', fallbackErr);
              if (onError) onError(fallbackErr);
            }
          );
        } catch (fbErr) {
          if (onError) onError(fbErr);
        }
      }
    );

    return () => {
      unsub();
      if (fallbackUnsub) fallbackUnsub();
    };
  } catch (err) {
    console.error('Failed to subscribe to comments:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Adds a new comment or reply to Firestore.
 * @param {Object} params
 * @param {string} params.postSlug - Target post slug
 * @param {string|null} params.parentId - Parent comment ID for replies, or null for root comments
 * @param {string} params.author - Name of the comment author
 * @param {string} params.content - Text content of the comment
 */
export async function addComment({ postSlug, parentId = null, author, content }) {
  if (!postSlug || !content?.trim()) {
    throw new Error('Post slug and comment content are required');
  }

  const cleanAuthor = author?.trim() || 'Anonymous Reader';
  const cleanContent = content.trim();

  const docRef = await addDoc(collection(db, 'comments'), {
    postSlug,
    parentId: parentId || null,
    author: cleanAuthor,
    content: cleanContent,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
