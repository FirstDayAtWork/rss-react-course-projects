import type { JSX } from 'react';
import type { ProductDetails } from './details';
import classes from './detail.module.css';

type DetailProps = {
  data: ProductDetails;
  name: keyof ProductDetails;
};

export default function Detail(props: DetailProps): JSX.Element {
  const { data, name } = props;

  if (name === 'dimensions') {
    const array = Object.entries(data[name]);
    return (
      <>
        {array.map((item) => (
          <li key={'.' + item[0]} className={classes.detail}>
            <span>{item[0]}</span>
            <span>{item[1]}</span>
          </li>
        ))}
      </>
    );
  }

  return (
    <li className={classes.detail}>
      <span>{name}</span>
      <span>{data[name] ?? 'unknown'}</span>
    </li>
  );
}
