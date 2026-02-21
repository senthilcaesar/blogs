# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static HTML blog website - no build tools, package managers, or frameworks are used. The site can be served directly by opening `index.html` in a browser or using any static file server.

## Project Structure

```
/
├── index.html              # Homepage with blog post card grid
├── serum-cholesterol.html  # Individual blog post
├── export-platforms.html   # Individual blog post
├── eric-mosley-interview.html  # Individual blog post
└── images/                 # Static assets for blog post covers
```

## Architecture

### Single-Page HTML Files
Each blog post is a self-contained HTML file with inline styles. There is no shared CSS or JavaScript - styles are duplicated across files.

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

### Homepage Layout
- CSS Grid-based responsive card layout (`blog-list`)
- Cards include cover image, category badge, title, excerpt, and metadata
- Hover animations: `slideInUp` for entry, scale effect on cover images

### Individual Blog Post Layout
- Content wrapped in `.blog-post-content` div (max-width 800px)
- Uses same design tokens and dark mode classes as homepage
- No theme toggle button; theme auto-loads from localStorage
- Content includes h3 headings, paragraphs, lists, and optionally tables

## Adding a New Blog Post

1. Create a new HTML file (e.g., `new-post.html`) following the pattern of existing posts
2. Add a cover image to the `images/` directory
3. Add a new `<article>` card to the blog grid in `index.html`
4. Update the card's href and thumbnail path

## Common Development Tasks

### View the site locally
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use Python simple server (Python 3)
python3 -m http.server 8000

# Option 3: Use Node.js http-server (if installed)
npx http-server
```

## Notes

- Blog cards on homepage link to external Notion pages for some posts, and to local HTML files for others
- Footer links (GitHub, Twitter) are placeholder URLs and should be updated
- No automated testing or linting is configured
- Images are stored locally in `images/` directory