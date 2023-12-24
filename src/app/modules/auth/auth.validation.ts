import { z } from 'zod';

const loginValidationSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});
const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old Password is required',
  }),
  newPassword: z.string({
    required_error: 'New Password is required',
  }),
});

export const LoginValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
