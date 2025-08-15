import type { JSX } from 'react';
import classes from './results.module.css';
import Loader from '../../ui/loader/loader';
import ProductItem from './item';
import type { ProductDetails } from '../details/details';

type ResultProps = {
  products: ProductDetails[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export default function Results(props: ResultProps): JSX.Element {
  const { products, isLoading, isError, error } = props;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    throw error;
  }

  return (
    <div className={classes['product-wrapper']}>
      <ul className={classes['product-ul']} id="product-ul">
        {products.length > 0 ? (
          products.map((item) => <ProductItem key={item.id + '.'} item={item} />)
        ) : (
          <h2>No Results Found</h2>
        )}
      </ul>
    </div>
  );
}
