import { useState, type JSX } from 'react';
import Controls from '../../components/controls/controls';
import Results from '../../components/results/results';
import Pagination from '../../components/pagination/pagination';
import { useSearchParams } from 'react-router';
import CheckBoard from '../../components/checkboard/checkboard';
import type { ProductDetails } from '../../components/details/details';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/get-products';
import { Refetch } from '../../components/refetch/refetch';

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

export type AppState = { query: string };

export default function Home(): JSX.Element {
  const [state, setState] = useState<AppState>({
    query: '',
  });

  const [page, setPage] = useSearchParams();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ['data', state.query, page.get('page'), setPage],
    queryFn: () => getProducts({ query: state.query, page: page.get('page'), setPage }),
    staleTime: 10000,
    retry: false,
  });

  function updateState(query: string, isUpdating: boolean): void {
    setState({ query });
    if (isUpdating) {
      setPage({ page: '1' });
    }
  }

  return (
    <>
      <Controls updateState={updateState} />
      <Results
        products={data?.products || []}
        isLoading={isPending}
        isError={isError}
        error={error}
      />
      <Pagination total={data?.total || 0} setPage={setPage} page={page} />
      <CheckBoard />
      <Refetch />
    </>
  );
}
