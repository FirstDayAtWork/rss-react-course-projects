import { type JSX } from 'react';
import Details from '../../../../components/details/details';

type PageProps = {
  params: Promise<{ details: string }>;
};

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const details = await params;

  return <Details details={details.details} />;
}
