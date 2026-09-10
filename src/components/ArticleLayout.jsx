import { CalendarRange, Check, ChevronLeft, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CommentsSection } from './CommentsSection';

export function ArticleLayout({ post, children }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setReadingProgress(
          Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100)),
        );
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

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

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
    <>
      <div
        className='reading-progress-bar'
        style={{ width: `${readingProgress}%` }}
        aria-hidden='true'
      />
      <article className='article-page'>
        <Link className='back-link' to='/'>
          <ChevronLeft size={16} />
          Go back
        </Link>

        <header className='article-hero'>
          <div className='article-hero__header'>
            <div className='article-hero__eyebrow-row'>
              <span className='article-hero__eyebrow'>
                {post.hero?.eyebrow ?? post.category}
              </span>
            </div>

            <h1 className='article-hero__title'>{post.title}</h1>
          </div>

          <div className='article-byline'>
            <div className='article-byline__left'>
              <div className='article-byline__author-info'>
                <div className='article-byline__secondary'>
                  <span className='article-byline__date'>
                    <CalendarRange size={14} />
                    {post.date}
                  </span>
                  <span className='article-byline__dot'>·</span>
                  <span className='article-byline__category'>{post.category}</span>
                  <span className='article-byline__dot'>·</span>
                  <span className='article-byline__name'>{post.author.name}</span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className='article-byline__dot'>·</span>
                      <div className='article-byline__tags'>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span className='article-byline__tag' key={tag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className='article-byline__right'>
              <button
                className={`article-byline__share-btn ${copied ? 'article-byline__share-btn--copied' : ''}`}
                type='button'
                onClick={handleCopyLink}
                title='Copy link to article'
              >
                {copied ? (
                  <>
                    <Check size={13} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        <div className='article-content'>{children}</div>

        <CommentsSection postSlug={post.slug} />
      </article>
    </>
  );
}
