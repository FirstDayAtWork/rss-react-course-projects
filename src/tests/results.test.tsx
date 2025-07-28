import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Results from '../components/results/results';
import { MockArray } from './__tests__/products-mock';
import { MemoryRouter } from 'react-router';

describe('rendering', () => {
  it('should renders correct number of items when data is provided', () => {
    const products = MockArray;
    const isLoading = false;

    const { container } = render(
      <MemoryRouter>
        <Results products={products} isLoading={isLoading} />
      </MemoryRouter>,
    );
    const ul = container.querySelector<HTMLUListElement>('#product-ul');
    expect(ul?.childNodes.length).toBe(MockArray.length);
  });

  it('should displays "No Results Found" message when data array is empty', () => {
    const products = MockArray.filter((_) => false);
    const isLoading = false;

    const { container } = render(
      <MemoryRouter>
        <Results products={products} isLoading={isLoading} />
      </MemoryRouter>,
    );
    const h2 = container.querySelector<HTMLHeadingElement>('h2');
    expect(h2).toHaveTextContent('No Results Found');
  });
});

describe('data display', () => {
  it('should correctly displays item names and descriptions', () => {
    const products = MockArray;
    const isLoading = false;

    const { container } = render(
      <MemoryRouter>
        <Results products={products} isLoading={isLoading} />
      </MemoryRouter>,
    );
    const ul = container.querySelector<HTMLUListElement>('#product-ul');

    for (let i = 0; i < products.length; i += 1) {
      expect(ul?.childNodes[i]?.childNodes[1]).toHaveTextContent(products[0].title);
      expect(ul?.childNodes[i].childNodes[2]).toHaveTextContent(products[0].description);
    }
  });
});
