import { type JSX } from 'react';
import Details from '../../../components/details/details';
import { getJustProducts } from '../../../api/get-products';
import Home from '../../../pages/home/home';
export const dynamicParams = false;

type Slugs = {
  details: string;
};

type PageProps = {
  params: Promise<{ details: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export async function generateStaticParams(): Promise<Slugs[]> {
  const data = await getJustProducts();
  return data.products.map((item) => ({ details: item.id.toString() }));
}

export default async function Page({ params, searchParams }: PageProps): Promise<JSX.Element> {
  const details = await params;
  const { q, page } = await searchParams;

  return (
    <>
      <Home q={q} page={page} />
      <Details details={details.details} />
    </>
  );
}
