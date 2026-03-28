import { BookOpenText, Code2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Header({ isDark, onToggleTheme, onOpenTechStack }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/">
          <div className="brand__mark">
            <BookOpenText size={22} />
          </div>
          <div>
            <p className="brand__eyebrow">
              <Sparkles size={14} />
              Personal Knowledge Hub
            </p>
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
