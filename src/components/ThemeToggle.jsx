export function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'}`}
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className={`theme-toggle__option ${!isDark ? 'is-active' : ''}`}>Day</span>
      <span className={`theme-toggle__option ${isDark ? 'is-active' : ''}`}>Night</span>
    </button>
  );
}
