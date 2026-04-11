import { LayoutGrid, LayoutList } from 'lucide-react';
import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { CategoryFilters } from './components/CategoryFilters';
import { Header } from './components/Header';
import { PostGrid } from './components/PostGrid';
import { SearchBar } from './components/SearchBar';
import { TechStackModal } from './components/TechStackModal';
import { ToastHost } from './components/ToastHost';
import { ArticleLayout } from './components/ArticleLayout';
import { articleRegistry } from './content/articles';
import { categories } from './data/categories';
import { localPosts, posts } from './data/posts';
import { useTheme } from './hooks/useTheme';
import { filterPosts } from './lib/posts';
import { getProjectTechStack } from './lib/techStack';

const techStack = getProjectTechStack();

function HomePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [view, setView] = useState('grid');
  const deferredQuery = useDeferredValue(query);
  const visiblePosts = filterPosts(posts, deferredQuery, activeCategory);

  useEffect(() => {
    const handleResetArticles = () => {
      setQuery('');
      setActiveCategory('All');
      window.requestAnimationFrame(() => {
        const section = document.getElementById('articles');
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    window.addEventListener('app-reset-articles', handleResetArticles);

    if (window.sessionStorage.getItem('scroll-target') === 'reset-articles') {
      window.sessionStorage.removeItem('scroll-target');
      handleResetArticles();
    }

    return () => {
      window.removeEventListener('app-reset-articles', handleResetArticles);
    };
  }, []);

  return (
    <div className="page-shell">
      <section className="control-panel" id="articles">
        <div className="panel-header">
          <SearchBar
            value={query}
            onChange={(event) =>
              startTransition(() => {
                setQuery(event.target.value);
              })
            }
            onClear={() => startTransition(() => setQuery(''))}
          />
          <div className="view-toggle" role="group" aria-label="View mode">
            <button
              className={`view-toggle__btn${view === 'list' ? ' is-active' : ''}`}
              type="button"
              title="List view"
              onClick={() => setView('list')}
            >
              <LayoutList size={18} />
            </button>
            <button
              className={`view-toggle__btn${view === 'grid' ? ' is-active' : ''}`}
              type="button"
              title="Grid view"
              onClick={() => setView('grid')}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelect={(category) =>
            startTransition(() => {
              setActiveCategory(category);
            })
          }
        />
      </section>

      <PostGrid posts={visiblePosts} view={view} />
    </div>
  );
}

function ArticlePage() {
  const { slug } = useParams();
  const post = localPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const ArticleComponent = articleRegistry[slug];

  return (
    <div className="page-shell">
      <ArticleLayout post={post}>
        <ArticleComponent />
      </ArticleLayout>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:slug" element={<ArticlePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppShell() {
  const { isDark, toggleTheme } = useTheme();
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenTechStack={() => setIsTechStackOpen(true)}
      />
      <main>
        <AppRoutes />
      </main>
      <TechStackModal
        isOpen={isTechStackOpen}
        onClose={() => setIsTechStackOpen(false)}
        stack={techStack}
      />
      <ToastHost />
      <footer className="site-footer" id="footer">
        <p>
          Built for GitHub Pages with React 19, Vite 8, Lucide React, and
          Vanilla CSS.
        </p>
      </footer>
    </div>
  );
}

export { AppShell };

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
