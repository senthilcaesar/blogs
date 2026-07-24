import { useEffect, useState } from 'react';
import { BookOpenText, Code2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Header({ isDark, onToggleTheme, onOpenTechStack }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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
  }, []);

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
        <div className="header-actions">
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
