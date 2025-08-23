import type { Item } from '../../../stores/store';
import classes from './content-item.module.css';
import type { JSX } from 'react';

type ContentItemProps = {
  item: Item;
};

export default function ContentItem(props: ContentItemProps): JSX.Element {
  const { item } = props;

  const keys = Object.keys(item);
  const values = Object.values(item);

  return (
    <>
      <div className={classes.data}>
        {keys.map(
          (key, ind) =>
            !(values[ind] instanceof File) &&
            ind !== 0 && (
              <div className={classes.item} key={ind + '.'}>
                <span className={classes.key}>{key}</span>
                <span className={classes.value}>{values[ind].toString()}</span>
              </div>
            ),
        )}
      </div>
    </>
  );
}
