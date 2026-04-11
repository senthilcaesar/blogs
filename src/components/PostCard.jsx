import { ArrowRight, Clock3, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

async function copyPostLink(post) {
  const baseUrl = window.location.origin + window.location.pathname;
  const target =
    post.type === 'local'
      ? `${baseUrl}#/posts/${post.slug}`
      : post.type === 'external'
        ? post.url
        : `${baseUrl}#/`;

  try {
    await navigator.clipboard.writeText(target);
    return true;
  } catch {
    try {
      window.prompt('Copy this link:', target);
      return true;
    } catch {
      return false;
    }
  }
}

export function PostCard({ post, view = 'list' }) {
  const cardStatus =
    post.type === 'comingSoon' ? 'Coming soon' : 'Read now';

  async function handleCopy() {
    const success = await copyPostLink(post);
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: {
          message: success ? 'Copied' : 'Copy failed',
          type: success ? 'success' : 'error',
        },
      }),
    );
  }

  const isGrid = view === 'grid';

  return (
    <article className={`post-card post-card--${view}`}>
      {/* Thumbnail / Media */}
      <div
        className="post-card__thumb"
        style={{ backgroundImage: `url(${post.image})` }}
        aria-hidden="true"
      />

      {/* Body */}
      <div className="post-card__body">
        {/* Top row: category + priority */}
        <div className="post-card__topline">
          <span className="post-chip">{post.category}</span>
          <span className={`priority-badge priority-badge--${post.priority.toLowerCase()}`}>
            <Sparkles size={12} />
            {post.priority}
          </span>
        </div>

        {/* Title */}
        <h2 className="post-card__title">{post.title}</h2>

        {/* Excerpt — always show in grid, hide in list when space is tight */}
        <p className="post-card__excerpt">{post.excerpt}</p>

        {/* Tags — only in grid view */}
        {isGrid && (
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {/* Footer: date + actions */}
        <div className="post-card__footer">
          <span className="post-meta">
            <Clock3 size={13} />
            {post.date}
          </span>

          <div className="post-card__actions">
            <button
              className="icon-button"
              type="button"
              title="Copy share link"
              onClick={handleCopy}
            >
              <Copy size={14} />
            </button>

            {post.type === 'local' && (
              <Link className="cta-link" to={post.route}>
                {cardStatus}
                <ArrowRight size={14} />
              </Link>
            )}

            {post.type === 'external' && (
              <a
                className="cta-link"
                href={post.url}
                target="_blank"
                rel="noreferrer"
              >
                {cardStatus}
                <ExternalLink size={14} />
              </a>
            )}

            {post.type === 'comingSoon' && (
              <span className="cta-link cta-link--muted">
                {cardStatus}
                <ArrowRight size={14} />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
