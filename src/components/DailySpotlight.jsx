import { ArrowRight, CalendarRange } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DailySpotlight({ post }) {
  if (!post) {
    return null;
  }

  return (
    <section className="spotlight-card">
      <div className="spotlight-card__meta">
        <span className="post-meta">
          <CalendarRange size={14} />
          Rotates daily
        </span>
      </div>
      <div className="spotlight-card__content">
        <div>
          <p className="spotlight-category">{post.category}</p>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
        {post.type === 'local' ? (
          <Link className="cta-link" to={post.route}>
            Open article
            <ArrowRight size={16} />
          </Link>
        ) : (
          <a className="cta-link" href={post.url} target="_blank" rel="noreferrer">
            Open article
            <ArrowRight size={16} />
          </a>
        )}
      </div>
    </section>
  );
}
