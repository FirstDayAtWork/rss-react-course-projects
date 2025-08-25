import type { JSX } from 'react';
import classes from '../form/input/input.module.css';
import type { FormInputs } from '../../zod/schema';
import { DataList } from '../form/datalist/datalist';
import type z from 'zod';

export default function Input({
  error,
  content,
}: {
  error: z.core.$ZodIssue[];
  content: [keyof FormInputs, string];
}): JSX.Element {
  const filterError = error.find((value) => value?.path[0] === content[0]);

  return (
    <li className={classes.list}>
      <label htmlFor={content[0]} className={classes.label}>
        {content[0]}
      </label>

      <input
        type={content[1]}
        className={classes.input}
        id={content[0]}
        name={content[0]}
        {...(content[0] === 'country' && { list: content[0] + '.' })}
      />

      {content[0] === 'country' && <DataList name={content[0]} />}
      <div className={classes['error-wrapper']}>
        {filterError && <div className={classes.error}>{filterError.message}</div>}
      </div>
    </li>
  );
}
