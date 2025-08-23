import type { JSX } from 'react';
import type { FormInputs } from '../../../zod/schema';
import { useFormDataStore } from '../../../stores/store';

type DataListProps = {
  name: keyof FormInputs;
};

export function DataList(props: DataListProps): JSX.Element {
  const { name } = props;

  const countries = useFormDataStore((state) => state.countries);

  return (
    <datalist id={name + '.'}>
      {countries.map((country) => (
        <option key={country} value={country}></option>
      ))}
    </datalist>
  );
}
