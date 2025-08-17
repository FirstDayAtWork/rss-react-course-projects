import type { Products } from '../pages/home/home';
import { queryMath } from '../utility/query-math';

type GetProductsProps = {
  query: string;
  location: string;
};

export async function getProducts(props: GetProductsProps): Promise<Products> {
  const { query, location } = props;

  const search = new URLSearchParams();
  search.set('q', query);
  search.set('limit', '10');
  search.set('skip', queryMath(location));
  const url = `https://dummyjson.com/products/search?${search}`;
  const response = await fetch(url);
  const data: Products = await response.json();
  if (response.ok) {
    return data;
  }

  throw new Error('Something went wrong');
}

export async function getAllProducts(): Promise<Products> {
  const url = `https://dummyjson.com/products?limit=0`;
  const response = await fetch(url);
  const data: Products = await response.json();
  if (response.ok) {
    return data;
  }

  throw new Error('Something went wrong');
}
