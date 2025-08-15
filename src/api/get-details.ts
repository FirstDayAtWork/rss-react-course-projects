import type { ProductDetails } from '../components/details/details';
import { notFound } from 'next/navigation';

type GetDetailsProps = {
  details: string | string[] | undefined;
};

export async function getDetails(props: GetDetailsProps): Promise<ProductDetails | undefined> {
  const { details } = props;

  try {
    if (details && Number.isNaN(+details)) {
      return notFound();
    }

    const url = `https://dummyjson.com/products/${details}`;
    const response = await fetch(url);
    const data: ProductDetails = await response.json();

    if (response.ok) {
      return data;
    }

    if (response.status === 404) {
      return notFound();
    }
  } catch (error) {
    console.error('Error', error);
  }
  throw new Error('Something went wrong');
}
