import { MoonStar, SunMedium } from 'lucide-react';

export function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="theme-toggle__thumb" aria-hidden="true">
        {isDark ? <MoonStar size={16} /> : <SunMedium size={16} />}
      </span>
      <span className="theme-toggle__label">{isDark ? 'Night' : 'Day'}</span>
    </button>
  );
}
