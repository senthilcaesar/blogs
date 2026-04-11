import { BookOpenText, Code2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Header({ isDark, onToggleTheme, onOpenTechStack }) {
  const location = useLocation();
  const navigate = useNavigate();

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
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/" onClick={handleBrandClick}>
          <div className="brand__mark">
            <BookOpenText size={22} />
          </div>
          <div>
            <h1>My Blogs</h1>
          </div>
        </Link>
        <div className="header-actions">
          <button className="header-secondary-button" type="button" onClick={onOpenTechStack}>
            <Code2 size={16} />
            Tech Stack
          </button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
