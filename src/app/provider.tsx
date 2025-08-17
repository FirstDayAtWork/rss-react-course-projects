'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { JSX, ReactNode } from 'react';
const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }): JSX.Element {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
