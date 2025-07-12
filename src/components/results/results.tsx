import type { JSX } from 'react';
import { Component } from 'react';
import type { Product } from '../app';
import classes from './results.module.css';
import Loader from '../../ui/loader/loader';
import ErrorMessage from '../../ui/error/error';
import ProductItem from './item';

type ResultProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: Error | null;
};

export default class Results extends Component<ResultProps> {
  render(): JSX.Element {
    const { products, isLoading, isError, errorMessage } = this.props;

    const condition = (): JSX.Element => {
      if (isError) {
        return <ErrorMessage error={errorMessage} />;
      }
      if (isLoading) {
        return <Loader />;
      }
      return (
        <>
          {products.length > 0 ? (
            products.map((item) => <ProductItem key={item.id + '.'} item={item} />)
          ) : (
            <h2>No Results Found</h2>
          )}
        </>
      );
    };

    return (
      <>
        <ul className={classes['product-ul']}>{condition()}</ul>
      </>
    );
  }
}
