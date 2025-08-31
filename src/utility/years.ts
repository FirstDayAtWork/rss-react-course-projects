export function createYearRange(start: number, end: number): number[] {
  const diff = end - start + 1;
  return Array.from({ length: diff }, (_, index) => start + index);
}
