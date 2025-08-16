import type { JSX } from 'react';
import { redirect } from 'next/navigation';
import Controls from '../../components/controls/controls';
import Results from '../../components/results/results';
import Pagination from '../../components/pagination/pagination';
import CheckBoard from '../../components/checkboard/checkboard';
import type { ProductDetails } from '../../components/details/details';
import { getProducts } from '../../api/get-products';

export type Product = {
  id: number;
  title: string;
  images: string[];
  description: string;
};

export type Products = {
  products: ProductDetails[];
  total: number;
  skip: number;
  limit: number;
  query: string;
};

type HomeProps = {
  q: string | undefined;
  page: string | undefined;
};

export default async function Home(props: HomeProps): Promise<JSX.Element> {
  const { q, page } = props;

  if (!page) {
    const queries = new URLSearchParams({ page: '1' });
    redirect(`/?${queries}`);
  }

  const data = await getProducts({
    query: q ?? '',
    location: page,
  });

  return (
    <>
      <Controls />
      <Results products={data?.products || []} />
      <Pagination total={data?.total || 0} />
      <CheckBoard />
    </>
  );
}
