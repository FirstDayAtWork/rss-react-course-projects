import type { JSX } from 'react';
import type { Product } from '../../pages/home/home';
import classes from './item.module.css';
import { Link, useLocation } from 'react-router';

type ItemProps = {
  item: Product;
};

export default function ProductItem(props: ItemProps): JSX.Element {
  const { item } = props;

  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const page = queries.get('page');

  return (
    <Link
      to={{ pathname: `${item.id}`, search: `?page=${page}` }}
      className={classes['product-li']}
    >
      <img src={item.images[0]} alt="Product Image" width={150} height={150} />
      <span className={classes['product-li-title']}>{item.title}</span>
      <p className={classes['product-li-description']}>{item.description}</p>
    </Link>
  );
}
