import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import Detail from '../components/details/detail';
import { MockProduct1 } from './__tests__/products-mock';

describe('rendering', () => {
  it('should render price', () => {
    const name = 'price';

    render(
      <MemoryRouter>
        <Detail data={MockProduct1} name={name} />
      </MemoryRouter>,
    );

    const li = screen.getByRole('listitem');
    expect(li.firstChild).toHaveTextContent('price');
    expect(li.lastChild).toHaveTextContent('69');
  });

  it('should render stock', () => {
    const name = 'stock';

    render(
      <MemoryRouter>
        <Detail data={MockProduct1} name={name} />
      </MemoryRouter>,
    );

    const li = screen.getByRole('listitem');
    expect(li.firstChild).toHaveTextContent('stock');
    expect(li.lastChild).toHaveTextContent('1');
  });

  it('should render category', () => {
    const name = 'category';

    render(
      <MemoryRouter>
        <Detail data={MockProduct1} name={name} />
      </MemoryRouter>,
    );

    const li = screen.getByRole('listitem');
    expect(li.firstChild).toHaveTextContent('category');
    expect(li.lastChild).toHaveTextContent('shit');
  });

  it('should render brand', () => {
    const name = 'brand';

    render(
      <MemoryRouter>
        <Detail data={MockProduct1} name={name} />
      </MemoryRouter>,
    );

    const li = screen.getByRole('listitem');
    expect(li.firstChild).toHaveTextContent('brand');
    expect(li.lastChild).toHaveTextContent('hueta');
  });

  it('should render dimensions', () => {
    const name = 'dimensions';

    render(
      <MemoryRouter>
        <Detail data={MockProduct1} name={name} />
      </MemoryRouter>,
    );

    const li = screen.getAllByRole('listitem');

    const keys = Object.keys(MockProduct1.dimensions);
    const values = Object.values(MockProduct1.dimensions).map((element) => element.toString());

    for (const [index, item] of li.entries()) {
      expect(item.firstChild).toHaveTextContent(keys[index]);
      expect(item.lastChild).toHaveTextContent(values[index]);
    }
  });
});
