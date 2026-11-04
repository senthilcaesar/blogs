import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { CategoryFilters } from './components/CategoryFilters';
import { Header } from './components/Header';
import { PostGrid } from './components/PostGrid';
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

const categoryCounts = categories.reduce((counts, category) => {
  counts[category] =
    category === 'All' ? posts.length : posts.filter((post) => post.category === category).length;
  return counts;
}, {});

function HomePage({ query, setQuery, view }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem('sidebar-collapsed') === '1';
    } catch {
      return false;
    }
  });
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

  const toggleSidebar = () => {
    setSidebarCollapsed((collapsed) => {
      try {
        window.localStorage.setItem('sidebar-collapsed', collapsed ? '0' : '1');
      } catch {
        // Storage can be unavailable (private mode); the toggle still works for this visit.
      }
      return !collapsed;
    });
  };

  return (
    <div className={`page-shell home-layout${sidebarCollapsed ? ' is-sidebar-collapsed' : ''}`}>
      <aside className="home-sidebar">
        <div className="home-sidebar__inner">
          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            counts={categoryCounts}
            collapsed={sidebarCollapsed}
            onToggleCollapsed={toggleSidebar}
            onSelect={(category) =>
              startTransition(() => {
                setActiveCategory(category);
              })
            }
          />
        </div>
      </aside>

      <div className="home-main" id="articles">
        <PostGrid posts={visiblePosts} view={view} />
      </div>
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

export function AppRoutes({ query = '', setQuery = () => {}, view = 'grid' }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage query={query} setQuery={setQuery} view={view} />} />
      <Route path="/posts/:slug" element={<ArticlePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppShell() {
  const { isDark, toggleTheme } = useTheme();
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('grid');
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo?.({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return (
    <div className="app-shell">
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenTechStack={() => setIsTechStackOpen(true)}
        search={
          pathname === '/'
            ? {
                value: query,
                // Update the input synchronously; HomePage defers the filtering itself.
                onChange: (event) => setQuery(event.target.value),
                onClear: () => setQuery(''),
              }
            : null
        }
        viewToggle={pathname === '/' ? { value: view, onChange: setView } : null}
      />
      <main>
        <AppRoutes query={query} setQuery={setQuery} view={view} />
      </main>
      <TechStackModal
        isOpen={isTechStackOpen}
        onClose={() => setIsTechStackOpen(false)}
        stack={techStack}
      />
      <ToastHost />
      <footer className="site-footer" id="footer">
        <p>
          Built for GitHub Pages with React 19, Vite 8, Material UI, Lucide React,
          and Firebase.
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
