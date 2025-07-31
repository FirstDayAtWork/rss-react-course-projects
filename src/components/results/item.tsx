import type { JSX } from 'react';
import type { Product } from '../../pages/home/home';
import classes from './item.module.css';
import { useLocation, useNavigate } from 'react-router';
import { scrollEvent } from '../../utility/scroll-event';

type ItemProps = {
  item: Product;
};

export default function ProductItem(props: ItemProps): JSX.Element {
  const { item } = props;

  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(): void {
    navigate(`${item.id}${location.search}`);
    scrollEvent({ side: 'top', value: 0, behavior: 'smooth' });
  }

  return (
    <li onClick={handleClick} className={classes['product-li']}>
      {item.images[0] && <img src={item.images[0]} alt="Product Image" width={150} height={150} />}
      <span className={classes['product-li-title']}>{item.title}</span>
      <p className={classes['product-li-description']}>{item.description}</p>
    </li>
  );
}
