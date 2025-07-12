import type { JSX } from 'react';
import { Component } from 'react';
import type { Product } from '../app';
import classes from './item.module.css';

type ItemProps = {
  item: Product;
};

export default class ProductItem extends Component<ItemProps> {
  render(): JSX.Element {
    const { item } = this.props;

    return (
      <li className={classes['product-li']}>
        <img src={item.images[0]} alt="Product Image" width={150} height={150} />
        <span className={classes['product-li-title']}>{item.title}</span>
        <p className={classes['product-li-description']}>{item.description}</p>
      </li>
    );
  }
}
