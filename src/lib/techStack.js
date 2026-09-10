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

  if (dependencies['react-router-dom']) {
    stack.push({
      key: 'router',
      icon: 'route',
      name: 'React Router',
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
    description: 'Custom CSS tokens and component classes define the design system without external UI framework overhead.',
    tone: 'emerald',
    size: 'small',
  });

  stack.push({
    key: 'motion',
    icon: 'sparkles',
    name: 'Native CSS Motion',
    description: 'Smooth hover micro-interactions, modal dialog physics, and progress indicators built with pure CSS.',
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
      description: 'Blazing-fast test runner validating routing, search filtering, comment hierarchy, and theme persistence.',
      tone: 'lime',
      size: 'small',
    });
  }

  return stack;
}
