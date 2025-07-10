import type { JSX } from 'react';
import { Component } from 'react';
import type { Product } from '../app';
import classes from './results.module.css';
import Loader from '../../ui/loader/loader';
import ErrorMessage from '../../ui/error/error';

type ResultProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: Error | null;
};

export default class Results extends Component<ResultProps> {
  state = {
    value: '',
  };

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
            products.map((item) => (
              <li key={item.id + '.'} className={classes['product-li']}>
                <img src={item.images[0]} alt="Product Image" width={150} height={150} />
                <span className={classes['product-li-title']}>{item.title}</span>
                <p className={classes['product-li-description']}>{item.description}</p>
              </li>
            ))
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
