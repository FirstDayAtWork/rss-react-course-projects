import type { SetURLSearchParams } from 'react-router';

export function queryMath(query: URLSearchParams, setPage: SetURLSearchParams): string {
  const page = query.get('page');

  if (page) {
    return page === '1' ? '0' : `${(+page - 1) * 10}`;
  }
  setPage({ page: '1' });
  return '0';
}
