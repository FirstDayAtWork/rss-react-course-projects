import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { Products } from '../pages/home/home';
import { queryMath } from '../utility/query-math';

type GetProductsProps = {
  query: string | null;
  location: string | null;
  navigate: AppRouterInstance;
};

export async function getProducts(props: GetProductsProps): Promise<Products> {
  const { query, location, navigate } = props;

  try {
    const search = new URLSearchParams();
    search.set('q', query ?? '');
    search.set('limit', '10');
    search.set('skip', queryMath(location, navigate));
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
