import { ArrowLeft, CalendarRange, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ArticleLayout({ post, children }) {
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
        </aside>
      </header>

      <div className="article-content">{children}</div>
    </article>
  );
}
