import { type JSX } from 'react';
import classes from './form.module.css';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { schema, type FormInputs } from '../../zod/schema';
import { useFormDataStore } from '../../stores/store';
import Input from './input/input';
import { array, selectOptions, checkboxData } from '../../utility/input-types';
import Select from './select/select';
import Checkbox from './checkbox/checkbox';
import fileToBase64 from '../../utility/file-to-base64';

type FormProps = {
  handleClose: () => void;
};

export default function Form(props: FormProps): JSX.Element {
  const { handleClose } = props;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: 'onChange', resolver: standardSchemaResolver(schema) });

  const setData = useFormDataStore((state) => state.setItem);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);

    fileToBase64({ data, setData });

    handleClose();
    reset();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {array.length > 0 &&
          array.map((item) => (
            <Input
              key={item[0]}
              register={register}
              setValue={setValue}
              error={errors}
              content={item}
            />
          ))}

        <Select register={register} error={errors} name={'gender'} options={selectOptions} />

        {checkboxData.map((item) => (
          <Checkbox key={item.name} register={register} error={errors} data={item} />
        ))}
      </ul>

      <button
        className={['btn-style', !isValid && 'disabled', ''].join(' ')}
        disabled={!isValid}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
