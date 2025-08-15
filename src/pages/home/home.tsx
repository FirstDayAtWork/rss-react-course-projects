'use client';

import type { JSX } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Controls from '../../components/controls/controls';
import Results from '../../components/results/results';
import Pagination from '../../components/pagination/pagination';
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

export default function Home(): JSX.Element {
  const navigate = useRouter();
  const pathname = usePathname();
  const location = useSearchParams();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ['data', location?.get('q'), location?.get('page'), navigate],
    queryFn: () =>
      getProducts({
        query: location?.get('q') ?? '',
        location: location?.get('page') ?? '',
        navigate,
      }),
    staleTime: 90000,
    retry: false,
  });

  function updatePage(query: string): void {
    const queries = new URLSearchParams({ page: '1', q: query });
    const preview = `${pathname}?${location}`;
    const current = `${pathname}?${queries}`;
    if (preview === current) {
      return;
    }
    navigate.push(current);
  }

  return (
    <>
      <Controls updatePage={updatePage} />
      <Results
        products={data?.products || []}
        isLoading={isPending}
        isError={isError}
        error={error}
      />
      <Pagination total={data?.total || 0} />
      <CheckBoard />
      <Refetch />
    </>
  );
}
