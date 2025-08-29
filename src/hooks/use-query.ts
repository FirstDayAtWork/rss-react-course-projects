import { use } from 'react';

const map = new Map<string, Promise<unknown>>();

export function useQuery<T>({ fn, key }: { fn: () => Promise<T>; key: string }): T | unknown {
  if (!map.has(key)) {
    map.set(key, fn());
  }

  const promise = map.get(key);

  if (promise instanceof Promise) {
    const result = use(promise);

    return result;
  }
}
