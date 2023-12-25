import { ROLE } from './user.constant';

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  updatePasswordAt?: Date;
  passwordHistory?: Array<{ password: string; updatePasswordAt: Date }>;
};

export type TRole = keyof typeof ROLE;
