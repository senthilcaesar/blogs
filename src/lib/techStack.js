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
      description: 'Fast, modern, component-driven UI framework powering the app shell and pages.',
      tone: 'sky',
    });
  }

  if (devDependencies.vite) {
    stack.push({
      key: 'vite',
      icon: 'zap',
      name: `Vite ${major(devDependencies.vite)}`,
      description: 'Build tool and dev server for fast local development, HMR, and production bundling.',
      tone: 'amber',
    });
  }

  if (dependencies['react-router-dom']) {
    stack.push({
      key: 'router',
      icon: 'route',
      name: 'React Router',
      description: 'Handles hash-based navigation for the homepage and local article routes on GitHub Pages.',
      tone: 'violet',
    });
  }

  if (dependencies['lucide-react']) {
    stack.push({
      key: 'lucide',
      icon: 'code',
      name: 'Lucide React',
      description: 'Provides the icon system used across navigation, cards, filters, and modal actions.',
      tone: 'rose',
    });
  }

  stack.push({
    key: 'css',
    icon: 'palette',
    name: 'Vanilla CSS',
    description: 'Custom class-based styling and design tokens define the visual system without a UI framework.',
    tone: 'emerald',
  });

  stack.push({
    key: 'motion',
    icon: 'sparkles',
    name: 'Native CSS Motion',
    description: 'Hover states, transitions, and motion are implemented with CSS instead of a dedicated animation library.',
    tone: 'cyan',
  });

  if (homepage.includes('github.io')) {
    stack.push({
      key: 'deploy',
      icon: 'cloud',
      name: 'GitHub Pages',
      description: 'The app is configured to publish as a static site, using the package homepage as the deployment base.',
      tone: 'slate',
    });
  }

  if (devDependencies.vitest) {
    stack.push({
      key: 'tests',
      icon: 'shield',
      name: 'Vitest',
      description: 'Runs component and behavior tests for filtering, routing, and theme persistence.',
      tone: 'lime',
    });
  }

  return stack;
}
