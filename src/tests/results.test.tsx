import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Results from '../components/results/results';
import { MockArray } from './__tests__/products-mock';
import { MemoryRouter } from 'react-router';

describe('rendering', () => {
  it('should renders correct number of items when data is provided', () => {
    const products = MockArray;
    const isLoading = false;

    render(
      <MemoryRouter>
        <Results products={products} isLoading={isLoading} />
      </MemoryRouter>,
    );
    const ul = screen.getByRole('list');

    expect(ul.childNodes.length).toBe(MockArray.length);
  });

  it('should displays "No Results Found" message when data array is empty', () => {
    const products = MockArray.filter((_) => false);
    const isLoading = false;

    render(
      <MemoryRouter>
        <Results products={products} isLoading={isLoading} />
      </MemoryRouter>,
    );
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('No Results Found');
  });
});

describe('data display', () => {
  it('should correctly displays item names and descriptions', () => {
    const isLoading = false;

    render(
      <MemoryRouter>
        <Results products={MockArray} isLoading={isLoading} />
      </MemoryRouter>,
    );

    const ul = screen.getByRole('list');

    for (let i = 0; i < MockArray.length; i += 1) {
      expect(ul.childNodes[i]?.childNodes[2]).toHaveTextContent(MockArray[0].title);
      expect(ul.childNodes[i].childNodes[3]).toHaveTextContent(MockArray[0].description);
    }
  });
});
