import type { ChangeEvent, MouseEvent, JSX } from 'react';
import classes from './item.module.css';
import { useLocation, useNavigate } from 'react-router';
import { useItemStore } from '../../stores/store';
import type { ProductDetails } from '../details/details';

type ItemProps = {
  item: ProductDetails;
};

export default function ProductItem(props: ItemProps): JSX.Element {
  const { item } = props;

  const items = useItemStore((state) => state.items);
  const setItem = useItemStore((state) => state.setItem);
  const removeItem = useItemStore((state) => state.removeItem);
  const isChecked = items.some((element) => element.id === item.id);

  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(event: MouseEvent): void {
    if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
      return;
    }

    navigate(`${item.id}${location.search}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleCheckBoxCheck(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.checked) {
      removeItem(item.id);
      return;
    }

    setItem(item);
  }

  return (
    <li onClick={handleClick} className={classes['product-li']}>
      <input
        checked={isChecked}
        onChange={handleCheckBoxCheck}
        className={classes['product-li-checkbox']}
        type="checkbox"
        name="product-li-checkbox"
        id={`product-li-checkbox${item.id}`}
        title="Select item"
      />
      {item.images[0] && <img src={item.images[0]} alt="Product Image" width={150} height={150} />}
      <span className={classes['product-li-title']}>{item.title}</span>
      <p className={classes['product-li-description']}>{item.description}</p>
    </li>
  );
}
