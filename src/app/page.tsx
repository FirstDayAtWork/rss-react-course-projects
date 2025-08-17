import type { JSX } from 'react';
import Home from '../pages/home/home';

type PageProps = {
  params: { details: string };
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function Page({ searchParams }: PageProps): Promise<JSX.Element> {
  const { q, page } = await searchParams;
  return <Home q={q} page={page} />;
}
