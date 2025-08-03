import { useEffect, useState, type JSX } from 'react';
import Controls from '../../components/controls/controls';
import Results from '../../components/results/results';
import Pagination from '../../components/pagination/pagination';
import { useSearchParams } from 'react-router';
import { queryMath } from '../../utility/query-math';
import CheckBoard from '../../components/checkboard/checkboard';

export type Product = {
  id: number;
  title: string;
  images: string[];
  description: string;
};

export type Products = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  query: string;
};

export type AppState = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: Error | null;
} & Products;

export default function Home(): JSX.Element {
  const [state, setState] = useState<AppState>({
    products: [{ id: 0, title: '', images: [''], description: '' }],
    total: 0,
    skip: 0,
    limit: 10,
    query: '',
    isLoading: true,
    isError: false,
    errorMessage: null,
  });

  const [page, setPage] = useSearchParams();

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        setState({ ...state, isLoading: true, isError: false, errorMessage: null });
        const search = new URLSearchParams();
        search.set('q', state.query);
        search.set('limit', '10');
        search.set('skip', queryMath(page, setPage));
        const url = `https://dummyjson.com/products/search?${search}`;
        const response = await fetch(url);
        const data: Products = await response.json();
        setState({ ...state, ...data, isLoading: false });
      } catch (error) {
        if (error instanceof Error) {
          setState({ ...state, isLoading: true, isError: true, errorMessage: error });
        }
        console.error('Error', error);
      }
    })();
  }, [state.query, page.get('page')]);

  function updateState(query: string): void {
    setState({ ...state, query });
    setPage({ page: '1' });
  }

  return (
    <>
      <Controls updateState={updateState} />
      <Results products={state.products} isLoading={state.isLoading} />
      <Pagination total={state.total} setPage={setPage} />
      <CheckBoard />
    </>
  );
}
