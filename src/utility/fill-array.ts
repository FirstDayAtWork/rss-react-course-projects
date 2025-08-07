export function fillArray(total: number, limit: number): number[] {
  const totalLength = total <= limit ? 1 : total / limit + 1;
  return Array.from({ length: totalLength }, (_, i) => i + 1);
}
