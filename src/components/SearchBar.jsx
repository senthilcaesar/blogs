import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-shell">
      <Search size={18} className="search-shell__icon" />
      <input
        type="search"
        className="search-shell__input"
        value={value}
        onChange={onChange}
        placeholder="Search by title, tags, category, or description..."
        aria-label="Search posts"
      />
      {value ? (
        <button
          className="search-clear"
          type="button"
          aria-label="Clear search"
          onClick={(e) => {
            e.preventDefault();
            onClear?.();
          }}
        >
          <X size={14} />
        </button>
      ) : (
        <span className="search-shortcut-badge" aria-hidden="true">
          ⌘K
        </span>
      )}
    </div>
  );
}
