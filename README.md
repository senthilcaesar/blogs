# Blogs

Personal knowledge hub rebuilt with **React 19 + Vite 8**, deployed to GitHub Pages at [senthilcaesar.github.io/blogs](https://senthilcaesar.github.io/blogs/). It features real-time threaded blog comments powered by **Firebase Cloud Firestore**.

---

## Useful AI Assistant Prompts

Here are useful, pre-tested prompts you can ask AI coding assistants when working on this codebase:

1. **Firebase SDK Config**

   > _"What is the Firebase SDK config for this app?"_

2. **Database Data Schema**

   > _"What is the currently deployed data schema for the comments collection?"_

3. **Fetch Recent Comments**
   > _"Fetch the 3 most recent comments from the Firestore database. Include the author name, comment content, date, time, and article slug"_

---

## Common Commands

```bash
npm run dev      # Start local development server (http://localhost:5173)
npm run build    # Production build -> dist/
npm run preview  # Preview production build locally
npm run test     # Run Vitest test suite
```

---

## Architecture Overview

- **Frontend**: React 19, Vite 8, HashRouter (`react-router-dom`), Lucide React icons, and Vanilla CSS.
- **Backend & Database**: Firebase Cloud Firestore (`zenshelf-tracker-react19`) for real-time threaded comments.
- **Hosting**: GitHub Pages automated static deployment.
