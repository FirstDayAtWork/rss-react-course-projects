import { use } from 'react';

const map = new Map<string, Promise<unknown>>();

export function useHandMadeQuery<T>({ fn, key }: { fn: () => Promise<T>; key: string }): T {
  if (!map.has(key)) {
    map.set(key, fn());
  }

  const promise = map.get(key) as Promise<T>;

  return use(promise);
}
