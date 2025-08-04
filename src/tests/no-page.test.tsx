import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import NoPage from '../pages/no-page/no-page';

describe('rendering', () => {
  it('should render h1', () => {
    render(
      <MemoryRouter>
        <NoPage />
      </MemoryRouter>,
    );

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toHaveTextContent('404');
  });

  it('should render h2', () => {
    render(
      <MemoryRouter>
        <NoPage />
      </MemoryRouter>,
    );

    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2).toHaveTextContent('Page not found');
  });

  it('should render img', () => {
    render(
      <MemoryRouter>
        <NoPage />
      </MemoryRouter>,
    );

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', 'pics/homer_grass.gif');
    expect(img).toHaveAttribute('alt', 'page not found');
  });
});
