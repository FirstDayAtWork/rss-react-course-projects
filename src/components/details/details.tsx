import type { JSX } from 'react';
import type { Product } from '../../pages/home/home';
import classes from './details.module.css';
import Detail from './detail';
import { getDetails } from '../../api/get-details';
import CloseDetail from './close-detail';
import Image from 'next/image';

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

type DetailsProps = {
  details: string;
};

export default async function Details(props: DetailsProps): Promise<JSX.Element> {
  const { details } = props;
  const data = await getDetails({ details });

  return (
    <div className={classes['details-wrapper']}>
      {data && (
        <div className={classes.details}>
          <CloseDetail />
          {data.images[0] && (
            <Image src={data.images[0]} alt="Product Image" width={200} height={200} />
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
