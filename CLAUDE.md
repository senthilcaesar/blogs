# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog site built with **React 19 + Vite 8**, deployed to GitHub Pages at  
`https://senthilcaesar.github.io/blogs/`. It uses HashRouter for client-side routing and Vanilla CSS for all styling (no Tailwind, no CSS-in-JS).

Legacy standalone HTML pages from the pre-migration site are kept in `legacy-html/` for reference only.

---

## Project Structure

```
/
├── index.html                    # Vite app entrypoint
├── vite.config.js                # Vite config (React plugin, base path)
├── package.json
├── images/                       # Static cover images for blog posts
├── legacy-html/                  # Archived standalone HTML pages (not active)
└── src/
    ├── main.jsx                  # React root mount
    ├── App.jsx                   # Routes + AppShell (header, footer, modals)
    ├── components/
    │   ├── Header.jsx            # Sticky header with brand, theme toggle, tech stack button
    │   ├── ThemeToggle.jsx       # Dark/light mode toggle (persisted in localStorage)
    │   ├── PostGrid.jsx          # Grid/list container; accepts 'view' prop
    │   ├── PostCard.jsx          # Individual card; adapts layout based on 'view' prop
    │   ├── SearchBar.jsx         # Controlled search input
    │   ├── CategoryFilters.jsx   # Filter pill buttons by category
    │   ├── DailySpotlight.jsx    # Featured post banner
    │   ├── ArticleLayout.jsx     # Layout wrapper for full article pages
    │   ├── TechStackModal.jsx    # Modal listing the project's tech stack
    │   └── ToastHost.jsx         # Global toast notification listener
    ├── content/
    │   └── articles/
    │       ├── index.js          # Registry mapping slug → article component
    │       └── *.jsx             # One JSX file per local blog post
    ├── data/
    │   ├── posts.js              # All post metadata (title, slug, category, tags, image, type…)
    │   └── categories.js         # Category list for filters
    ├── hooks/
    │   └── useTheme.js           # Theme state + localStorage persistence
    ├── lib/
    │   ├── posts.js              # filterPosts() utility
    │   └── techStack.js          # Tech stack data for modal
    └── styles/
        └── global.css            # All styles — design tokens, components, layout, responsive
```

---

## Architecture

### Routing
Uses `HashRouter` from `react-router-dom` v7 (required for GitHub Pages static hosting).  
- `/` → `HomePage` (search + filters + post grid)  
- `/posts/:slug` → `ArticlePage` (full article layout)

### Post Types
Each post in `src/data/posts.js` has a `type` field:
- `'local'` — rendered as a React article via the slug registry in `src/content/articles/index.js`
- `'external'` — links out to a Notion page (opens in new tab)
- `'comingSoon'` — shows a muted "Coming soon" badge; not clickable

### View Toggle (Grid / List)
`HomePage` holds a `view` state (`'grid'` is the default). It is passed to `PostGrid` → `PostCard`.  
- **Grid**: multi-column, vertical card with image on top, tags visible, footer pinned to bottom
- **List**: single-column, horizontal card with 100px thumbnail on the left, no tags

### Design System
All design tokens live in `:root` in `global.css`:

| Token | Value |
|---|---|
| `--accent` | `#ff8a3d` (orange) |
| `--accent-secondary` | `#7dd3fc` (sky blue) |
| `--accent-tertiary` | `#c4b5fd` (violet) |
| `--bg` | `#0d1117` (dark) / `#f7f5ef` (light) |
| `--font` | IBM Plex Sans (Google Fonts) |
| `--radius-xl/lg/md/sm` | 32 / 24 / 18 / 12px |

Light mode overrides are applied via `body[data-theme='light']`.

### Theme
- State managed in `useTheme` hook, persisted to `localStorage` under key `theme`
- Applied via `data-theme` attribute on `<body>`

---

## Adding a New Blog Post

1. **Add metadata** to `src/data/posts.js`:
   - Set `type: 'local'` for a full article page, `'external'` for a Notion link
   - Provide `slug`, `category`, `tags`, `image`, `date`, `priority`, `author`, `excerpt`
   - For local posts add `route: '/posts/<slug>'` and `hero: { eyebrow, summary }`

2. **Add a cover image** to `images/` and reference it via the `imageUrl()` helper already in `posts.js`

3. **Create the article component** at `src/content/articles/<SlugArticle>.jsx`  
   Use `ArticleLayout` children pattern — existing articles are good references

4. **Register the slug** in `src/content/articles/index.js`:
   ```js
   import { MyNewArticle } from './MyNewArticle';
   export const articleRegistry = {
     ...
     'my-new-slug': MyNewArticle,
   };
   ```

---

## Common Development Commands

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build → dist/
npm run preview      # Preview the production build locally
npm run test         # Run Vitest tests
npm run test:ui      # Open Vitest UI
```

---

## Notes

- No linting or formatting config is set up (no ESLint, no Prettier)
- Testing uses Vitest + @testing-library/react; tests live in `src/test/`
- GitHub Actions deploys `dist/` to GitHub Pages on push to `main`
- The `base` path in `vite.config.js` must match the GitHub Pages repo path (`/blogs/`)
- `DailySpotlight` reads from `posts.js` and surfaces one featured post per day
