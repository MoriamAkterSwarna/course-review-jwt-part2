import { z } from 'zod';

const createUserValidationSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.enum(['user', 'admin']),
});

export const UserValidations = {
  createUserValidationSchema,
};
