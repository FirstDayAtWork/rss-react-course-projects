import type { JSX } from 'react';
import { Component } from 'react';
import type { Product } from '../app';
import classes from './results.module.css';

type ResultProps = {
  products: Product[];
};

export default class Results extends Component<ResultProps> {
  state = {
    value: '',
  };

  render(): JSX.Element {
    const { products } = this.props;

    return (
      <>
        <ul className={classes['product-ul']}>
          {products[0].title &&
            products.map((item) => (
              <li key={item.id + '.'} className={classes['product-li']}>
                <img src={item.images[0]} alt="Product Image" width={150} height={150} />
                <span className={classes['product-li-title']}>{item.title}</span>
                <p className={classes['product-li-description']}>{item.description}</p>
              </li>
            ))}
        </ul>
      </>
    );
  }
}
