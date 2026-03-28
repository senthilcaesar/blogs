import {
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Code2,
  Database,
  Globe,
  HeartPulse,
  LayoutGrid,
  Ship,
  Users,
} from 'lucide-react';

const iconByCategory = {
  All: LayoutGrid,
  AI: Brain,
  Career: BriefcaseBusiness,
  Health: HeartPulse,
  Code: Code2,
  Statistics: BarChart3,
  Data: Database,
  Leadership: Users,
  'Web Dev': Globe,
  Export: Ship,
};

export function CategoryFilters({ categories, activeCategory, onSelect }) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Post categories">
      {categories.map((category) => {
        const Icon = iconByCategory[category] ?? LayoutGrid;
        return (
          <button
            key={category}
            className={`filter-pill ${activeCategory === category ? 'is-active' : ''}`}
            type="button"
            onClick={() => onSelect(category)}
          >
            <Icon size={15} />
            {category}
          </button>
        );
      })}
    </div>
  );
}
