import type { NavigateFunction } from 'react-router';
import type { ProductDetails } from '../components/details/details';

type GetDetailsProps = {
  details: string | undefined;
  navigate: NavigateFunction;
};

export async function getDetails(props: GetDetailsProps): Promise<ProductDetails | undefined> {
  const { details, navigate } = props;

  try {
    if (details && Number.isNaN(+details)) {
      navigate('/nopage');
      return;
    }

    const url = `https://dummyjson.com/products/${details}`;
    const response = await fetch(url);
    const data: ProductDetails = await response.json();

    if (response.ok) {
      return data;
    }

    if (response.status === 404) {
      navigate('/nopage');
      return;
    }
  } catch (error) {
    console.error('Error', error);
  }
  throw new Error('Something went wrong');
}
