import type { SetURLSearchParams } from 'react-router';

export function queryMath(query: string | null, setPage: SetURLSearchParams): string {
  if (query) {
    return query === '1' ? '0' : `${(+query - 1) * 10}`;
  }
  setPage({ page: '1' });
  return '0';
}
