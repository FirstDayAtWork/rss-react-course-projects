import z from 'zod';
import { countries } from '../utility/countries';
import { selectOptions } from '../utility/input-types';

const basicSchema = z.object({
  name: z.string().regex(/^(?=[A-Z])[a-zA-Z]{1,72}$/, { error: 'Must be Capitalized!' }),
  age: z.number().nonnegative(),
  email: z.email(),
  gender: z.enum(selectOptions, { error: 'Must be one from gender list' }),
  terms: z.literal(true, { error: 'Must be Checked!' }),
  country: z.enum(countries, { error: 'Must be one from countries list' }),
});

const passwordSchema = z
  .object({
    password: z.string().regex(/^(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])(?=.*[!@#$%^&*])\S{8,72}$/, {
      error: `At least 8 characters long
        contains a lowercase letter
        contains an uppercase letter
        contains a digit
        contains a special character `,
    }),
    confirm: z.string().regex(/^(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])(?=.*[!@#$%^&*])\S{8,72}$/, {
      error: `At least 8 characters long
        contains a lowercase letter
        contains an uppercase letter
        contains a digit
        contains a special character `,
    }),
  })
  .refine((data) => data.password === data.confirm, {
    error: 'Passwords should match!',
    path: ['confirm'],
  });

const imageSchema = z.object({
  image: z
    .file({ error: 'Must be a file' })
    .mime(['image/png', 'image/jpeg'], { error: 'Must be PNG or JPEG' })
    .max(1_000_000, { error: 'Max 1MB' }),
});

export const schema = basicSchema.and(imageSchema).and(passwordSchema);

export type FormInputs = z.infer<typeof schema>;
