import type { FormInputs } from '../zod/schema';

const INPUT_TYPES: Map<keyof FormInputs, string> = new Map()
  .set('name', 'text')
  .set('age', 'number')
  .set('email', 'email')
  .set('password', 'password')
  .set('confirm', 'password')
  .set('image', 'file')
  .set('country', 'text');

export const array = [...INPUT_TYPES.entries()];

export type CheckBoxData = {
  name: keyof FormInputs;
  title: string;
};

export const checkboxData: CheckBoxData[] = [
  { name: 'terms', title: 'Accept Terms and Conditions agreement' },
];

export type SelectOptions = ['human', 'undead', 'elf', 'orc'];

export const selectOptions: SelectOptions = ['human', 'undead', 'elf', 'orc'];
