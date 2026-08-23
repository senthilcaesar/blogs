import { useState, useEffect, useCallback } from 'react';
import { subscribeToComments, addComment } from '../services/commentService';

export function useComments(postSlug) {
  const [comments, setComments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!postSlug) {
      setComments([]);
      setTotalCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToComments(
      postSlug,
      (tree, count) => {
        setComments(tree);
        setTotalCount(count);
        setLoading(false);
      },
      (err) => {
        setError(err?.message || 'Failed to load comments');
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [postSlug]);

  const submitComment = useCallback(
    async ({ author, content, parentId = null }) => {
      if (!content || !content.trim()) return false;
      setSubmitting(true);
      setError(null);

      try {
        await addComment({
          postSlug,
          parentId,
          author,
          content,
        });

        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: {
              message: parentId
                ? 'Reply posted successfully!'
                : 'Comment posted successfully!',
              type: 'success',
            },
          }),
        );
        return true;
      } catch (err) {
        console.error('Error submitting comment:', err);
        setError(err?.message || 'Failed to post comment');
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: {
              message: 'Failed to post comment. Please try again.',
              type: 'error',
            },
          }),
        );
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [postSlug],
  );

  return {
    comments,
    totalCount,
    loading,
    error,
    submitting,
    submitComment,
  };
}
