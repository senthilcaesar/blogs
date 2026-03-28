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

  it('persists theme values in localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: /light theme/i }));

    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    expect(document.body.dataset.theme).toBe('light');
  });
});
