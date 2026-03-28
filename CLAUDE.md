# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is now a React + Vite blog application. Legacy standalone HTML pages from the pre-migration site are kept in `legacy-html/` for reference.

## Project Structure

```
/
├── index.html              # Vite app entrypoint
├── src/                    # React app source
├── legacy-html/            # Archived standalone HTML pages from the old site
└── images/                 # Static assets for blog post covers
```

## Architecture

### React App
The active app lives under `src/` and is bundled with Vite. Shared CSS and components power the current site.

### Design System
- **Colors**: Defined in CSS `:root` variables:
  - `--primary: #2563eb` (blue)
  - `--primary-dark: #1e40af`
  - `--accent: #f97316` (orange)
  - `--success: #10b981`
  - `--warning: #f59e0b`

- **Fonts**:
  - `Inter` - body text (from Google Fonts)
  - `Crimson Text` - headings and titles (from Google Fonts)

### Dark Mode
- Theme state is persisted in `localStorage` under key `theme`
- Theme is applied via `dark-mode` class on the `body` element
- **Index page**: `initTheme()` reads from localStorage AND checks system preference (`prefers-color-scheme: dark`); includes toggle button
- **Individual blog posts**: Only auto-load saved theme from localStorage; no toggle button provided

### Legacy HTML Files
The archived files in `legacy-html/` reflect the old static site structure and are not the current runtime entrypoints.

## Adding a New Blog Post

1. Add or update post data in `src/data/posts.js`
2. Add a React article component under `src/content/articles/` if the post is local
3. Add any needed cover image to `images/`
4. Update routes or shared UI only if the new post needs new behavior

## Common Development Tasks

### View the site locally
```bash
# Start the Vite dev server
npm run dev

# Build the production bundle
npm run build
```

## Notes

- Blog cards on homepage link to external Notion pages for some posts, and to local HTML files for others
- Footer links (GitHub, Twitter) are placeholder URLs and should be updated
- No automated testing or linting is configured
- Images are stored locally in `images/` directory
