import type { JSX } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import classes from './input.module.css';
import type { FormInputs } from '../../../zod/schema';

export default function Input({
  register,
  error,
  content,
}: {
  register: UseFormRegister<FormInputs>;
  error: FieldErrors<FormInputs>;
  content: [keyof FormInputs, string];
}): JSX.Element {
  return (
    <li className={classes.list}>
      <label htmlFor={content[0]} className={classes.label}>
        {content[0]}
      </label>

      <input
        {...register(content[0], {
          valueAsNumber: content[1] === 'number',
        })}
        type={content[1]}
        className={classes.input}
        id={content[0]}
        name={content[0]}
      />
      {error[content[0]] && <div className={classes.error}>{error[content[0]]?.message}</div>}
    </li>
  );
}
