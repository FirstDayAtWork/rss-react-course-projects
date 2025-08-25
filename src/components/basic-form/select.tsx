import type { JSX } from 'react';
import classes from '../form/select/select.module.css';
import type { FormInputs } from '../../zod/schema';
import type { SelectOptions } from '../../utility/input-types';
import type z from 'zod';

export default function Select({
  error,
  name,
  options,
}: {
  error: z.core.$ZodIssue[];
  name: keyof FormInputs;
  options: SelectOptions;
}): JSX.Element {
  const filterError = error.find((value) => value?.path[0] === name);

  return (
    <li className={classes.list}>
      <label htmlFor={name} className={classes.label}>
        {name}
      </label>

      <select className={classes.select} name={name} id={name}>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {filterError && <div className={classes.error}>{filterError.message}</div>}
    </li>
  );
}
