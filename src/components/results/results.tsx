import type { JSX } from 'react';
import classes from './results.module.css';
import ProductItem from './item';
import type { ProductDetails } from '../details/details';

type ResultProps = {
  products: ProductDetails[];
};

export default function Results(props: ResultProps): JSX.Element {
  const { products } = props;

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
