import type { JSX } from 'react';
import classes from './form.module.css';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './input/input';
import { array, selectOptions, checkboxData } from '../../utility/input-types';
import { schema, type FormInputs } from '../../zod/schema';
import Select from './select/select';
import Checkbox from './checkbox/checkbox';

type FormProps = {
  handleClose: () => void;
};

export default function Form(props: FormProps): JSX.Element {
  const { handleClose } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: 'onChange', resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (data) {
      console.log(data);
      handleClose();
      reset();
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {array.length > 0 &&
          array.map((item) => (
            <Input key={item[0]} register={register} error={errors} content={item} />
          ))}

        <Select register={register} error={errors} name={'gender'} options={selectOptions} />

        {checkboxData.map((item) => (
          <Checkbox key={item.name} register={register} error={errors} data={item} />
        ))}
      </ul>

      <button className={[!isValid && 'disabled', ''].join(' ')} disabled={!isValid} type="submit">
        Submit
      </button>
    </form>
  );
}
