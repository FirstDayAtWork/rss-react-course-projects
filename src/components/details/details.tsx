import type { JSX } from 'react';
import type { Product } from '../../pages/home/home';
import classes from './details.module.css';
import Detail from './detail';
import Loader from '../../ui/loader/loader';
import { useQuery } from '@tanstack/react-query';
import { getDetails } from '../../api/get-details';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const categories: (keyof ProductDetails)[] = ['brand', 'category', 'stock', 'price', 'dimensions'];

export type ProductDetails = {
  price: number;
  stock: number;
  category: string;
  brand: string;
  dimensions: Dimensions;
} & Product;

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export default function Details(): JSX.Element {
  const parametrs = useParams();
  const navigate = useRouter();
  const location = useSearchParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['details', parametrs?.details],
    queryFn: () => getDetails({ details: parametrs?.details }),
    staleTime: 90000,
    retry: false,
  });

  function handleCloseEvent(): void {
    navigate.push(`/?${location}`, { scroll: false });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    throw error;
  }

  return (
    <div className={classes['details-wrapper']}>
      {data && (
        <div className={classes.details}>
          <button
            type="button"
            name="close-details"
            className={classes['close-details-btn']}
            onClick={handleCloseEvent}
          ></button>
          {data.images[0] && (
            <img src={data.images[0]} alt="Product Image" width={200} height={200} />
          )}
          <span className={classes['details-title']}>{data.title}</span>
          <p className={classes['details-description']}>{data.description}</p>
          <ul className={classes['detail-wrapper']}>
            {categories.map((item) => (
              <Detail key={item + '.'} data={data} name={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
