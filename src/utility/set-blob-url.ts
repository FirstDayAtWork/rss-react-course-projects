export function setBlobUrl(csv: string): string {
  const blob = new Blob([csv], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  return url;
}
