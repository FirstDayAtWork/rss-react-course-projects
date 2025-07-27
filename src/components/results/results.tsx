import type { JSX } from 'react';
import type { Product } from '../../pages/home/home';
import classes from './results.module.css';
import Loader from '../../ui/loader/loader';
import ErrorMessage from '../../ui/error/error';
import ProductItem from './item';
import { Outlet } from 'react-router';

type ResultProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: Error | null;
};

export default function Results(props: ResultProps): JSX.Element {
  const { products, isLoading, isError, errorMessage } = props;

  if (isError) {
    return <ErrorMessage error={errorMessage} />;
  }
  if (isLoading) {
    return <Loader />;
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
      <Outlet />
    </div>
  );
}
