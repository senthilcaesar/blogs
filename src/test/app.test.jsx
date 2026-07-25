import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import App, { AppRoutes } from '../App';

function renderRoutes(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('blog app', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders posts from the shared data source and filters them by search query', async () => {
    const user = userEvent.setup();
    renderRoutes();

    expect(
      screen.getByRole('heading', {
        name: /10 steps to master ai agents and claude code/i,
      }),
    ).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox', { name: /search posts/i }), 'cholesterol');

    expect(
      screen.getByRole('heading', { name: /what is serum cholesterol/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: /10 steps to master ai agents and claude code/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('filters posts by category', async () => {
    const user = userEvent.setup();
    renderRoutes();

    await user.click(screen.getByRole('button', { name: /health/i }));

    expect(
      screen.getByRole('heading', { name: /what is serum cholesterol/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: /10 steps to master ai agents and claude code/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('renders a local article route', () => {
    renderRoutes(['/posts/ai-agents-mastery']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /10 steps to master ai agents and claude code/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/watch the interview/i)).toBeInTheDocument();
  });

  it('renders the new AI Agents microservices article correctly', () => {
    renderRoutes(['/posts/ai-agents-microservices-intelligence']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /AI Agents are nothing but micro services with Intelligence/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Thinking of AI agents as "smart microservices" gets you most of the way there/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/The Big Difference: Rules vs. Goals/i)).toBeInTheDocument();
  });

  it('renders the new SQLAlchemy article correctly', () => {
    renderRoutes(['/posts/python-orm-sqlalchemy']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Python ORM, SQLAlchemy/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/To understand SQLAlchemy, it helps to first understand the problem it solves/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/The ORM Mental Model/i)).toBeInTheDocument();
  });

  it('renders the new 4 Prompts Chatbots article correctly', () => {
    renderRoutes(['/posts/chatbots-know-about-you']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /4 Prompts That Can Tell You What Chatbots Really Know About You/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Tell me everything you’ve figured out about me that I never actually stated/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /What have you figured out about me that is embarrassing or sensitive\?/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the React Server Components article correctly', () => {
    renderRoutes(['/posts/react-server-components-aggregation-layer']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Making Sense of React Server Components and the Aggregation Layer/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/The Problem with Heavy Browsers/i)).toBeInTheDocument();
    expect(screen.getByText(/A Practical Shift: React Server Components/i)).toBeInTheDocument();
    expect(screen.getByText(/The Backend-for-Frontend \(BFF\) Pattern/i)).toBeInTheDocument();
    expect(screen.getByText(/Real Security/i)).toBeInTheDocument();
    expect(screen.getByText(/The Right Tools for the Job/i)).toBeInTheDocument();
  });

  it('renders the 1-Hour Next.js Build OpenTelemetry article correctly', () => {
    renderRoutes(['/posts/1-hour-nextjs-build-opentelemetry-cicd']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /The 1-Hour Next.js Build: How OpenTelemetry Shined a Light on CI\/CD Bottlenecks/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/The Problem: The CI\/CD Black Box/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 1: Measuring the Pipeline with Thoth/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 2: Unlocking Internal Next.js Traces/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 3: Visualizing the Bottleneck with Oodle.ai/i)).toBeInTheDocument();
    expect(screen.getByText(/The Culprit: Webpack/i)).toBeInTheDocument();
    expect(screen.getByText(/The Takeaway/i)).toBeInTheDocument();
    expect(screen.getByAltText(/OpenTelemetry Trace Waterfall Visualization/i)).toBeInTheDocument();
  });

  it('renders the React UI Packages article correctly', () => {
    renderRoutes(['/posts/how-to-build-react-ui-packages-that-dont-break']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /How to Build React UI Packages That Don't Break/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/The Problem: Global CSS/i)).toBeInTheDocument();
    expect(screen.getByText(/The Solution: Prefixes and Scoped Containers/i)).toBeInTheDocument();
    expect(screen.getByText(/Why This Works/i)).toBeInTheDocument();
  });

  it('renders the MongoDB Atlas for React Apps article correctly', () => {
    renderRoutes(['/posts/mongodb-atlas-for-react-apps']);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Mongo DB Atlas for React Apps/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/The Translation Problem/i)).toBeInTheDocument();
    expect(screen.getByText(/Traditional Multi-Tool Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/The Single Platform Shift/i)).toBeInTheDocument();
    expect(screen.getByText(/Why This Matters for AI/i)).toBeInTheDocument();
  });

  it('persists theme values in localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: /dark theme/i }));

    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    expect(document.body.dataset.theme).toBe('dark');
  });
});
