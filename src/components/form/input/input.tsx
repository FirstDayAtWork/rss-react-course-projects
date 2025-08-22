import type { ChangeEvent, JSX } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import classes from './input.module.css';
import type { FormInputs } from '../../../zod/schema';

export default function Input({
  register,
  setValue,
  error,
  content,
}: {
  register: UseFormRegister<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  error: FieldErrors<FormInputs>;
  content: [keyof FormInputs, string];
}): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>, name: keyof FormInputs): void {
    register(name).onChange({
      target: {
        name,
        value: event.target.files?.[0],
      },
    });
  }

  return (
    <li className={classes.list}>
      <label htmlFor={content[0]} className={classes.label}>
        {content[0]}
      </label>

      {content[1] === 'file' ? (
        <input
          {...(register(content[0]),
          {
            onChange: (event): void => {
              if (event.target.files && event.target.files.length > 0) {
                setValue(content[0], event.target.files[0]);
              }
            },
          })}
          type={content[1]}
          className={classes.input}
          id={content[0]}
          name={content[0]}
          onChange={(event): void => handleChange(event, content[0])}
        />
      ) : (
        <input
          {...register(content[0], {
            valueAsNumber: content[1] === 'number',
          })}
          type={content[1]}
          className={classes.input}
          id={content[0]}
          name={content[0]}
        />
      )}

      {error[content[0]] && <div className={classes.error}>{error[content[0]]?.message}</div>}
    </li>
  );
}
