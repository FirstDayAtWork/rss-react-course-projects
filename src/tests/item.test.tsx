import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProductItem from '../components/results/item';
import { MockProduct1 } from './__tests__/products-mock';
import { MemoryRouter } from 'react-router';

describe('rendering', () => {
  it('should displays item name and description correctly', () => {
    const mockItem = MockProduct1;

    render(
      <MemoryRouter>
        <ProductItem item={mockItem} />
      </MemoryRouter>,
    );

    const li = screen.getByRole('listitem');

    expect(li.childNodes[2]).toHaveTextContent(mockItem.title);
    expect(li.childNodes[3]).toHaveTextContent(mockItem.description);
  });

  it('should display image', () => {
    const mockItem = MockProduct1;

    render(
      <MemoryRouter>
        <ProductItem item={mockItem} />
      </MemoryRouter>,
    );

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Product Image');
  });

  it('should display checkbox', () => {
    const mockItem = MockProduct1;

    render(
      <MemoryRouter>
        <ProductItem item={mockItem} />
      </MemoryRouter>,
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    screen.debug();
  });
});

describe('should handle click on checkbox', () => {
  it('should be checked/unchecked', () => {
    const mockItem = MockProduct1;

    render(
      <MemoryRouter>
        <ProductItem item={mockItem} />
      </MemoryRouter>,
    );
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
