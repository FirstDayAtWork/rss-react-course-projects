import type { JSX } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import classes from './select.module.css';
import type { FormInputs } from '../../../zod/schema';
import type { SelectOptions } from '../../../utility/input-types';

export default function Select({
  register,
  error,
  name,
  options,
}: {
  register: UseFormRegister<FormInputs>;
  error: FieldErrors<FormInputs>;
  name: keyof FormInputs;
  options: SelectOptions;
}): JSX.Element {
  return (
    <li className={classes.list}>
      <label htmlFor={name} className={classes.label}>
        {name}
      </label>

      <select {...register(name)} className={classes.select} name={name} id={name}>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className={classes['error-wrapper']}>
        {error[name] && <div className={classes.error}>{error[name]?.message}</div>}
      </div>
    </li>
  );
}
