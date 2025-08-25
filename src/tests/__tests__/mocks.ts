import type { FormInputs } from '../../zod/schema';

export const mockValidFormData: FormInputs = {
  name: 'Billy',
  email: 'example@gmail.com',
  age: 69,
  gender: 'Demon',
  terms: true,
  country: 'Erathia',
  image: new File(['image'], 'image.jpeg', {
    type: 'text/plain',
  }),
  password: 'qW1#',
  confirm: 'qW1#',
};

export const mockInvalidFormData = {
  name: 'billy',
  email: 'example@gmail.com',
  age: -1,
  gender: 'Demon',
  terms: false,
  country: 'Erathia',
  image: new File(['image'], 'image.gif', {
    type: 'text/plain',
  }),
  password: 'qW1#',
  confirm: 'qW1#',
};
