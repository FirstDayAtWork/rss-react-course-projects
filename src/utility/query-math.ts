export function queryMath(query: string | null): string {
  if (query) {
    return query === '1' ? '0' : `${(+query - 1) * 10}`;
  }

  return '0';
}
