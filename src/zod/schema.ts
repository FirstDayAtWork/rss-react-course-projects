import z from 'zod';

const basicSchema = z.object({
  name: z.string().regex(/^(?=[A-Z])[a-zA-Z]{1,72}$/, { error: 'Must be Capitalized!' }),
  age: z.number().nonnegative(),
  email: z.email(),
  gender: z.enum(['human', 'undead', 'elf', 'orc']),
  terms: z.literal(true, { error: 'Must be Checked!' }),
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

export const schema = basicSchema.and(passwordSchema);

export type FormInputs = z.infer<typeof schema>;
