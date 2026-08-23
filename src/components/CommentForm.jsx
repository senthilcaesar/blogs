import { useState } from 'react';
import { Send, X } from 'lucide-react';

export function CommentForm({
  onSubmit,
  onCancel = null,
  submitting = false,
  placeholder = 'Write a comment...',
  buttonLabel = 'Post Comment',
  autoFocus = false,
}) {
  const [author, setAuthor] = useState(() => {
    return localStorage.getItem('comment_author_name') || '';
  });
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    // Save author name locally for convenience in future comments
    if (author.trim()) {
      localStorage.setItem('comment_author_name', author.trim());
    }

    const success = await onSubmit({
      author: author.trim(),
      content: content.trim(),
    });

    if (success) {
      setContent('');
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='comment-form__row'>
        <input
          type='text'
          className='comment-form__input'
          placeholder='Your name (optional)'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={submitting}
          maxLength={50}
        />
      </div>
      <div className='comment-form__row'>
        <textarea
          className='comment-form__textarea'
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
          rows={3}
          required
          autoFocus={autoFocus}
        />
      </div>
      <div className='comment-form__actions'>
        {onCancel && (
          <button
            type='button'
            className='comment-form__cancel-btn'
            onClick={onCancel}
            disabled={submitting}
          >
            <X size={14} />
            Cancel
          </button>
        )}
        <button
          type='submit'
          className='comment-form__submit-btn'
          disabled={!content.trim() || submitting}
        >
          <Send size={14} />
          {submitting ? 'Posting...' : buttonLabel}
        </button>
      </div>
    </form>
  );
}
