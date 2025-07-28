import { useEffect, useState, type JSX } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import type { Product } from '../../pages/home/home';
import classes from './details.module.css';
import Detail from './detail';
import { scrollEvent } from '../../utility/scroll-event';
import Loader from '../../ui/loader/loader';

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
  const [data, setData] = useState<ProductDetails>({
    id: 0,
    title: '',
    images: [''],
    description: '',
    price: 0,
    stock: 0,
    category: '',
    brand: '',
    dimensions: { width: 0, height: 0, depth: 0 },
  });

  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { details } = useParams();
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const page = queries.get('page');

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        if (details && Number.isNaN(+details)) {
          navigate(`${details}`);
          return;
        }
        setLoading(true);
        const url = `https://dummyjson.com/products/${details}`;
        const response = await fetch(url);
        const data: ProductDetails = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
      }
    })();
  }, [details]);

  function handleCloseEvent(): void {
    navigate({ pathname: '/', search: `?page=${page}` });
    scrollEvent({ side: 'top', value: 0, behavior: 'smooth' });
  }

  return (
    <div className={classes['details-wrapper']}>
      {isLoading ? (
        <Loader />
      ) : (
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
