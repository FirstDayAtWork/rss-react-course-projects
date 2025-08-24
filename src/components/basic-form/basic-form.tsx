import { type JSX, type FormEvent, useRef, useState } from 'react';
import classes from '../form/form.module.css';
import { schema } from '../../zod/schema';
import { useFormDataStore } from '../../stores/store';
import { array, selectOptions, checkboxData } from '../../utility/input-types';
import fileToBase64 from '../../utility/file-to-base64';
import Input from './input';
import Select from './select';
import Checkbox from './checkbox';
import { z } from 'zod';

type FormProps = {
  handleClose: () => void;
};

export default function BasicForm(props: FormProps): JSX.Element {
  const { handleClose } = props;

  const [errors, setErros] = useState<z.core.$ZodIssue[]>([]);

  const formReference = useRef<HTMLFormElement>(null);

  const setData = useFormDataStore((state) => state.setItem);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (formReference.current instanceof HTMLFormElement) {
      const formData = new FormData(formReference.current);
      const data = Object.fromEntries(formData);
      try {
        const result = schema.parse(data);

        fileToBase64({ data: result, setData });
        handleClose();
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErros(error.issues);
        }
      }
    }
  };

  return (
    <form ref={formReference} className={classes.form} onSubmit={onSubmit}>
      <ul>
        {array.length > 0 &&
          array.map((item) => <Input key={item[0]} content={item} error={errors} />)}

        <Select name={'gender'} options={selectOptions} error={errors} />

        {checkboxData.map((item) => (
          <Checkbox key={item.name} data={item} error={errors} />
        ))}
      </ul>

      <button className={['btn-style'].join(' ')} type="submit">
        Submit
      </button>
    </form>
  );
}
