import { ArrowLeft, CalendarRange, Copy, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ArticleLayout({ post, children }) {
  const handleCopyLink = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const target = `${baseUrl}#/posts/${post.slug}`;

    let success = false;
    try {
      await navigator.clipboard.writeText(target);
      success = true;
    } catch {
      try {
        window.prompt('Copy this link:', target);
        success = true;
      } catch {
        success = false;
      }
    }

    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: {
          message: success ? 'Link copied to clipboard!' : 'Copy failed',
          type: success ? 'success' : 'error',
        },
      }),
    );
  };

  return (
    <article className="article-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={16} />
        Back to the library
      </Link>

      <header className="article-hero">
        <div className="article-hero__copy">
          <p className="article-hero__eyebrow">{post.hero?.eyebrow ?? post.category}</p>
          <h1>{post.title}</h1>
          <p className="article-hero__summary">{post.hero?.summary ?? post.excerpt}</p>
        </div>

        <aside className="article-hero__meta">
          <div className="author-badge">
            <div className="author-badge__mark">{post.author.initials}</div>
            <div>
              <strong>{post.author.name}</strong>
              <span>{post.author.role}</span>
            </div>
          </div>
          <div className="meta-row">
            <span className="post-meta">
              <CalendarRange size={14} />
              {post.date}
            </span>
            <span className="post-meta">
              <UserRound size={14} />
              {post.category}
            </span>
          </div>
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <button className="article-share-btn" type="button" onClick={handleCopyLink}>
            <Copy size={15} />
            Copy Link
          </button>
        </aside>
      </header>

      <div className="article-content">{children}</div>
    </article>
  );
}
