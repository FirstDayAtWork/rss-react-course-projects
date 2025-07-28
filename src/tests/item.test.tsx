import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProductItem from '../components/results/item';
import { MockProduct1 } from './__tests__/products-mock';
import { MemoryRouter } from 'react-router';

describe('rendering', () => {
  it('should displays item name and description correctly', () => {
    const mockItem = MockProduct1;

    const { container } = render(
      <MemoryRouter>
        <ProductItem item={mockItem} />
      </MemoryRouter>,
    );
    const li = container.querySelector<HTMLLIElement>('li');

    expect(li?.childNodes[1]).toHaveTextContent(mockItem.title);
    expect(li?.childNodes[2]).toHaveTextContent(mockItem.description);
  });
});
