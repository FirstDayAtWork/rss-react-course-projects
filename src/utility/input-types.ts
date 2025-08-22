import type { FormInputs } from '../zod/schema';

const INPUT_TYPES: Map<keyof FormInputs, string> = new Map()
  .set('name', 'text')
  .set('age', 'number')
  .set('email', 'email')
  .set('password', 'password')
  .set('confirm', 'password')
  .set('image', 'file');

export const array = [...INPUT_TYPES.entries()];

export type CheckBoxData = {
  name: keyof FormInputs;
  title: string;
};

export const checkboxData: CheckBoxData[] = [
  { name: 'terms', title: 'Accept Terms and Conditions agreement' },
];

export const selectOptions: FormInputs['gender'][] = ['human', 'undead', 'elf', 'orc'];
