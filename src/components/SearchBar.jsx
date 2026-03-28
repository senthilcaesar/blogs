import { Search } from 'lucide-react';

export function SearchBar({ value, onChange }) {
  return (
    <label className="search-shell">
      <Search size={18} />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by title, tags, category, or description"
        aria-label="Search posts"
      />
    </label>
  );
}
