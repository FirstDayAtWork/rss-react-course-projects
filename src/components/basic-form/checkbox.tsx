import type { JSX } from 'react';
import classes from '../form/checkbox/checkbox.module.css';
import type { CheckBoxData } from '../../utility/input-types';
import type z from 'zod';

export default function Checkbox({
  error,
  data,
}: {
  error: z.core.$ZodIssue[];
  data: CheckBoxData;
}): JSX.Element {
  const filterError = error.find((value) => value?.path[0] === data.name);

  return (
    <li className={classes.list}>
      <input className={classes.checkbox} name={data.name} id={data.name} type="checkbox"></input>

      <label htmlFor={data.name} className={classes.label}>
        {data.title}
      </label>

      {filterError && <div className={classes.error}>{filterError.message}</div>}
    </li>
  );
}
