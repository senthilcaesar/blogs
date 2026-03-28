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

export function PostCard({ post }) {
  const cardStatus =
    post.type === 'comingSoon'
      ? 'Coming soon'
      : 'Read now';

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

  return (
    <article className="post-card">
      <div
        className="post-card__media"
        style={{ backgroundImage: `url(${post.image})` }}
        aria-hidden="true"
      />
      <div className="post-card__body">
        <div className="post-card__topline">
          <span className="post-chip">{post.category}</span>
          <span className={`priority-badge priority-badge--${post.priority.toLowerCase()}`}>
            <Sparkles size={14} />
            {post.priority}
          </span>
        </div>

        <h2>{post.title}</h2>
        <p className="post-card__excerpt">{post.excerpt}</p>

        <div className="tag-row">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="post-card__footer">
          <span className="post-meta">
            <Clock3 size={14} />
            {post.date}
          </span>

          <div className="post-card__actions">
            <button
              className="icon-button"
              type="button"
              title="Copy share link"
              onClick={handleCopy}
            >
              <Copy size={16} />
            </button>

            {post.type === 'local' && (
              <Link className="cta-link" to={post.route}>
                {cardStatus}
                <ArrowRight size={16} />
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
                <ExternalLink size={16} />
              </a>
            )}

            {post.type === 'comingSoon' && (
              <span className="cta-link cta-link--muted">
                {cardStatus}
                <ArrowRight size={16} />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
