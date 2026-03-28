import { startTransition, useDeferredValue, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { DailySpotlight } from './components/DailySpotlight';
import { CategoryFilters } from './components/CategoryFilters';
import { Header } from './components/Header';
import { PostGrid } from './components/PostGrid';
import { SearchBar } from './components/SearchBar';
import { TechStackModal } from './components/TechStackModal';
import { ArticleLayout } from './components/ArticleLayout';
import { articleRegistry } from './content/articles';
import { categories } from './data/categories';
import { localPosts, posts } from './data/posts';
import { useTheme } from './hooks/useTheme';
import { filterPosts, getDailySpotlight } from './lib/posts';
import { getProjectTechStack } from './lib/techStack';

const techStack = getProjectTechStack();

function HomePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const deferredQuery = useDeferredValue(query);
  const visiblePosts = filterPosts(posts, deferredQuery, activeCategory);
  const spotlightPost = getDailySpotlight(
    posts.filter((post) => post.type !== 'comingSoon'),
  );

  return (
    <div className="page-shell">
      <DailySpotlight post={spotlightPost} />

      <section className="control-panel">
        <SearchBar
          value={query}
          onChange={(event) =>
            startTransition(() => {
              setQuery(event.target.value);
            })
          }
        />
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

      <PostGrid posts={visiblePosts} />
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
