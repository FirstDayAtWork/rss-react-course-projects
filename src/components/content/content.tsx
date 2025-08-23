import { useFormDataStore } from '../../stores/store';
import classes from './content.module.css';
import type { JSX } from 'react';
import Item from './content-item/content-item';

export default function Content(): JSX.Element {
  const items = useFormDataStore((state) => state.items);

  return (
    <>
      {items.length > 0 && (
        <div className={classes.wrapper}>
          {items.map((item, index) => (
            <div className={classes.content} key={index}>
              <img
                className={classes.image}
                src={item.base64Img}
                alt="user picture"
                width="100%"
                height={200}
              />
              <Item item={item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
