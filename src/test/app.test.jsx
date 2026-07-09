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

  it('persists theme values in localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: /light theme/i }));

    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    expect(document.body.dataset.theme).toBe('light');
  });
});
