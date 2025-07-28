export function setLSData<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLSData<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function removeLSData(key: string): void {
  localStorage.removeItem(key);
}
