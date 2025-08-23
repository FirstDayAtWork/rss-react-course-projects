import z from 'zod';
import { countries } from '../utility/countries';
import { selectOptions } from '../utility/input-types';

const imageSchema = z
  .file({ error: 'Must be a file' })
  .mime(['image/png', 'image/jpeg'], { error: 'Must be PNG or JPEG' })
  .max(1_000_000, { error: 'Max 1MB' });

const basicSchema = z.object({
  name: z.string().regex(/^(?=[A-Z])[a-zA-Z]{1,72}$/, { error: 'Must be Capitalized!' }),
  email: z.email(),
  age: z.number().nonnegative(),
  gender: z.enum(selectOptions),
  terms: z.literal(true, { error: 'Must be Checked!' }),
  country: z.enum(countries, { error: 'Must be one from countries list' }),
  image: imageSchema,
});

const passwordTemplate = z
  .string()
  .regex(/\d/g, {
    error: 'Must contain a digit',
  })
  .regex(/[a-z]/g, {
    error: 'Must contain a lowercase letter',
  })
  .regex(/[A-Z]/g, {
    error: 'Must contain an uppercase letter',
  })
  .regex(/[!@#$%^&*]/g, {
    error: 'Must contain a !@#$%^&*',
  })
  .regex(/^\S*$/, {
    error: 'No Spaces!',
  });

const passwordSchema = z
  .object({
    password: passwordTemplate,
    confirm: passwordTemplate,
  })
  .refine((data) => data.password === data.confirm, {
    error: 'Passwords should match!',
    path: ['confirm'],
  });

export const schema = basicSchema.and(passwordSchema);

export type FormInputs = z.infer<typeof schema>;
