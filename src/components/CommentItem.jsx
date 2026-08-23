import { useState } from 'react';
import { MessageSquareReply, CornerDownRight } from 'lucide-react';
import { CommentForm } from './CommentForm';

function getInitials(name) {
  if (!name || name === 'Anonymous Reader') return 'AR';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatDate(isoString) {
  if (!isoString) return 'Just now';
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return 'Recently';
  }
}

export function CommentItem({ comment, onSubmitReply, submitting }) {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplySubmit = async (data) => {
    const success = await onSubmitReply({
      ...data,
      parentId: comment.id,
    });
    if (success) {
      setIsReplying(false);
    }
    return success;
  };

  return (
    <div className='comment-item' id={`comment-${comment.id}`}>
      <div className='comment-item__header'>
        <div className='comment-item__avatar'>
          {getInitials(comment.author)}
        </div>
        <div className='comment-item__meta'>
          <span className='comment-item__author'>{comment.author}</span>
          <span className='comment-item__date'>
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>

      <div className='comment-item__body'>
        <p>{comment.content}</p>
      </div>

      <div className='comment-item__footer'>
        <button
          type='button'
          className='comment-item__reply-btn'
          onClick={() => setIsReplying((prev) => !prev)}
        >
          <MessageSquareReply size={14} />
          Reply
        </button>
      </div>

      {isReplying && (
        <div className='comment-item__reply-form'>
          <div className='reply-form__prefix'>
            <CornerDownRight size={14} />
            <span>
              Replying to <strong>{comment.author}</strong>
            </span>
          </div>
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={() => setIsReplying(false)}
            submitting={submitting}
            placeholder={`Reply to ${comment.author}...`}
            buttonLabel='Post Reply'
            autoFocus
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className='comment-item__replies'>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onSubmitReply={onSubmitReply}
              submitting={submitting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
