import type { JSX } from 'react';
import { Component } from 'react';
import type { Product } from '../app';
import classes from './results.module.css';
import Loader from '../../ui/loader/loader';

type ResultProps = {
  products: Product[];
  isLoading: boolean;
};

export default class Results extends Component<ResultProps> {
  state = {
    value: '',
  };

  render(): JSX.Element {
    const { products, isLoading } = this.props;

    return (
      <>
        <ul className={classes['product-ul']}>
          {isLoading ? (
            <Loader />
          ) : (
            products.map((item) => (
              <li key={item.id + '.'} className={classes['product-li']}>
                <img src={item.images[0]} alt="Product Image" width={150} height={150} />
                <span className={classes['product-li-title']}>{item.title}</span>
                <p className={classes['product-li-description']}>{item.description}</p>
              </li>
            ))
          )}
          {products.length === 0 && <h2>No Results Found</h2>}
        </ul>
      </>
    );
  }
}
