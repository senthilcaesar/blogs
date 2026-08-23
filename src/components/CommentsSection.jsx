import { MessageSquare } from 'lucide-react';
import { useComments } from '../hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

export function CommentsSection({ postSlug }) {
  const { comments, totalCount, loading, error, submitting, submitComment } =
    useComments(postSlug);

  const handleRootSubmit = async (data) => {
    return await submitComment({
      ...data,
      parentId: null,
    });
  };

  const handleReplySubmit = async (data) => {
    return await submitComment(data);
  };

  return (
    <section className='comments-section' aria-label='Comments section'>
      <div className='comments-section__header'>
        <h2>
          <MessageSquare size={22} />
          Comments{' '}
          {totalCount > 0 && (
            <span className='comments-badge'>{totalCount}</span>
          )}
        </h2>
      </div>

      <div className='comments-section__main-form'>
        <CommentForm
          onSubmit={handleRootSubmit}
          submitting={submitting}
          placeholder='Leave a comment on this post...'
          buttonLabel='Post Comment'
        />
      </div>

      {error && (
        <div className='comments-section__error' role='alert'>
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className='comments-section__loading'>
          <div className='comments-skeleton' />
          <div className='comments-skeleton' />
        </div>
      ) : comments.length === 0 ? (
        <div className='comments-section__empty'>
          <p>
            No comments yet. Be the first to share your thoughts on this post!
          </p>
        </div>
      ) : (
        <div className='comments-section__list'>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onSubmitReply={handleReplySubmit}
              submitting={submitting}
            />
          ))}
        </div>
      )}
    </section>
  );
}
