import { useEffect, useState } from 'react';
import { BookOpenText, Code2, LayoutGrid, LayoutList } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderSearch } from './HeaderSearch';
import { ThemeToggle } from './ThemeToggle';

export function Header({ isDark, onToggleTheme, onOpenTechStack, search = null, viewToggle = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  // The landing page keeps the header (search, view toggle) pinned; articles hide it while reading.
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (isHome) {
      setIsVisible(true);
      return undefined;
    }

    // Initial check on mount
    if (window.scrollY > 50) {
      setIsVisible(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  function handleBrandClick(event) {
    const resetAndScrollToArticles = () => {
      window.dispatchEvent(new CustomEvent('app-reset-articles'));
      window.requestAnimationFrame(() => {
        const section = document.getElementById('articles');
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    if (location.pathname === '/') {
      event.preventDefault();
      resetAndScrollToArticles();
      return;
    }

    event.preventDefault();
    window.sessionStorage.setItem('scroll-target', 'reset-articles');
    navigate('/');
  }

  return (
    <header className={`site-header${isVisible ? '' : ' site-header--hidden'}`}>
      <div className="site-header__inner">
        <Link className="brand" to="/" onClick={handleBrandClick}>
          <div className="brand__mark">
            <BookOpenText size={16} />
          </div>
          <div>
            <h1>Blogs</h1>
          </div>
        </Link>
        {search && (
          <div className="header-search">
            <HeaderSearch value={search.value} onChange={search.onChange} onClear={search.onClear} />
          </div>
        )}
        <div className="header-actions">
          {viewToggle && (
            <div className="view-toggle" role="group" aria-label="View mode">
              <button
                className={`view-toggle__btn${viewToggle.value === 'list' ? ' is-active' : ''}`}
                type="button"
                title="List view"
                aria-label="List view"
                aria-pressed={viewToggle.value === 'list'}
                onClick={() => viewToggle.onChange('list')}
              >
                <LayoutList size={17} />
              </button>
              <button
                className={`view-toggle__btn${viewToggle.value === 'grid' ? ' is-active' : ''}`}
                type="button"
                title="Grid view"
                aria-label="Grid view"
                aria-pressed={viewToggle.value === 'grid'}
                onClick={() => viewToggle.onChange('grid')}
              >
                <LayoutGrid size={17} />
              </button>
            </div>
          )}
          <button className="header-secondary-button" type="button" onClick={onOpenTechStack}>
            <Code2 size={15} />
            Tech Stack
          </button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
