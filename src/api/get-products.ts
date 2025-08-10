import type { SetURLSearchParams } from 'react-router';
import type { Products } from '../pages/home/home';
import { queryMath } from '../utility/query-math';

type GetProductsProps = {
  query: string | null;
  page: string | null;
  setPage: SetURLSearchParams;
};

export async function getProducts(props: GetProductsProps): Promise<Products> {
  const { query, page, setPage } = props;

  try {
    const search = new URLSearchParams();
    search.set('q', query ?? '');
    search.set('limit', '10');
    search.set('skip', queryMath(page, setPage));
    const url = `https://dummyjson.com/products/search?${search}`;
    const response = await fetch(url);
    const data: Products = await response.json();
    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error('Error', error);
  }
  throw new Error('Something went wrong');
}
