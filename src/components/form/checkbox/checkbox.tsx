import type { JSX } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import classes from './checkbox.module.css';
import type { FormInputs } from '../../../zod/schema';
import type { CheckBoxData } from '../../../utility/input-types';

export default function Checkbox({
  register,
  error,
  data,
}: {
  register: UseFormRegister<FormInputs>;
  error: FieldErrors<FormInputs>;
  data: CheckBoxData;
}): JSX.Element {
  return (
    <li className={classes.list}>
      <input
        {...register(data.name)}
        className={classes.checkbox}
        name={data.name}
        id={data.name}
        type="checkbox"
      ></input>

      <label htmlFor={data.name} className={classes.label}>
        {data.title}
      </label>

      <div className={classes['error-wrapper']}>
        {error[data.name] && <div className={classes.error}>{error[data.name]?.message}</div>}
      </div>
    </li>
  );
}
