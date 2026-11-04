import packageJson from '../../package.json';

function major(version) {
  return version?.replace(/^[^\d]*/, '').split('.')[0] ?? '';
}

export function getProjectTechStack() {
  const dependencies = packageJson.dependencies ?? {};
  const devDependencies = packageJson.devDependencies ?? {};
  const homepage = packageJson.homepage ?? '';

  const stack = [];

  if (dependencies.react) {
    stack.push({
      key: 'react',
      icon: 'react',
      name: `React ${major(dependencies.react)}`,
      description: 'Fast, modern, component-driven UI framework powering the app shell, pages, and interactive features.',
      tone: 'sky',
      size: 'feature',
    });
  }

  if (devDependencies.vite) {
    stack.push({
      key: 'vite',
      icon: 'zap',
      name: `Vite ${major(devDependencies.vite)}`,
      description: 'Next-gen build tool and dev server for ultra-fast HMR and production bundling.',
      tone: 'amber',
      size: 'wide',
    });
  }

  if (dependencies.firebase) {
    stack.push({
      key: 'firebase',
      icon: 'database',
      name: `Firebase Cloud Firestore ${major(dependencies.firebase)}`,
      description: 'Real-time cloud NoSQL database powering global live comment threads across all site visitors.',
      tone: 'orange',
      size: 'wide',
    });
  }

  if (dependencies['@mui/material']) {
    stack.push({
      key: 'mui',
      icon: 'layout',
      name: `Material UI ${major(dependencies['@mui/material'])}`,
      description:
        'Builds the topics sidebar and header search, styled with Emotion and themed from the site’s own colour tokens so both follow day and night mode.',
      tone: 'sky',
      size: 'wide',
    });
  }

  stack.push({
    key: 'fonts',
    icon: 'type',
    name: 'Typography',
    description:
      'Google Fonts: Libre Baskerville for the logo, Belgrano for headings, Source Sans 3 for interface text, Plus Jakarta Sans for the sidebar and IBM Plex Mono for code. Article text is set in Georgia.',
    tone: 'rose',
    size: 'wide',
  });

  if (dependencies['react-router-dom']) {
    stack.push({
      key: 'router',
      icon: 'route',
      name: `React Router ${major(dependencies['react-router-dom'])}`,
      description: 'Handles hash-based client navigation for the home page and article routes on GitHub Pages.',
      tone: 'violet',
      size: 'small',
    });
  }

  if (dependencies['lucide-react']) {
    stack.push({
      key: 'lucide',
      icon: 'code',
      name: 'Lucide React',
      description: 'Provides the clean vector icon system used across navigation, cards, comments, and modals.',
      tone: 'rose',
      size: 'small',
    });
  }

  stack.push({
    key: 'css',
    icon: 'palette',
    name: 'Vanilla CSS',
    description: 'Hand-written CSS tokens and classes style the cards, articles and layout; Material UI reads the same tokens.',
    tone: 'emerald',
    size: 'small',
  });

  stack.push({
    key: 'motion',
    icon: 'sparkles',
    name: 'CSS Motion',
    description: 'Hover effects, the modal entrance and the reading progress bar use CSS transitions; Material UI adds tooltips and ripples.',
    tone: 'cyan',
    size: 'small',
  });

  if (homepage.includes('github.io')) {
    stack.push({
      key: 'deploy',
      icon: 'cloud',
      name: 'GitHub Pages',
      description: 'Automated CI/CD static hosting directly from the repository source.',
      tone: 'slate',
      size: 'small',
    });
  }

  if (devDependencies.vitest) {
    stack.push({
      key: 'tests',
      icon: 'shield',
      name: 'Vitest',
      description: 'Runs the test suite with Testing Library, covering routing, search, category filters and comments.',
      tone: 'lime',
      size: 'small',
    });
  }

  return stack;
}

export const TECH_STACK_TITLE = 'Architecture & Tech Stack';
export const TECH_STACK_INTRO =
  'The modern tools, cloud storage, and libraries powering this blog.';
export const TECH_STACK_SUMMARY =
  `Client-side React ${major(packageJson.dependencies?.react)} app with Material UI and a Firebase Cloud Firestore realtime backend`;

/**
 * Flattens the tech stack into plain text for the modal's copy button.
 * @param {Array} stack - Entries from getProjectTechStack()
 * @returns {string} Newline-delimited summary of every entry
 */
export function formatTechStackForCopy(stack = []) {
  const lines = [
    TECH_STACK_TITLE,
    TECH_STACK_INTRO,
    `${stack.length} core technologies`,
    '',
  ];

  stack.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   ${item.description}`);
    lines.push('');
  });

  lines.push(TECH_STACK_SUMMARY);

  return lines.join('\n');
}
