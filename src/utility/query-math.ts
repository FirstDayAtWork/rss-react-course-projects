import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function queryMath(query: string | null, navigate: AppRouterInstance): string {
  if (query) {
    return query === '1' ? '0' : `${(+query - 1) * 10}`;
  }

  const queries = new URLSearchParams({ page: '1' });
  navigate.push(`/?${queries}`);
  return '0';
}
