import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import About from '../pages/about/about';

describe('rendering', () => {
  it('should render h1', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toHaveTextContent('About Page');
  });

  it('should render h2', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2).toHaveTextContent('App for learning purposes only >:D');
  });

  it('should render footer', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const link1 = screen.getByText('Github');
    const link2 = screen.getByText('RS School');

    expect(link1).toHaveAttribute('href', 'https://github.com/FirstDayAtWork');
    expect(link2).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
