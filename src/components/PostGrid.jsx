import { FileSearch } from 'lucide-react';
import { PostCard } from './PostCard';

export function PostGrid({ posts, view = 'list' }) {
  if (!posts.length) {
    return (
      <div className="empty-state" role="status">
        <FileSearch size={28} />
        <h2>No posts match this search</h2>
        <p>Try another keyword or switch back to a broader category.</p>
      </div>
    );
  }

  return (
    <section
      className={`post-grid post-grid--${view}`}
      aria-label="Post results"
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} view={view} />
      ))}
    </section>
  );
}
