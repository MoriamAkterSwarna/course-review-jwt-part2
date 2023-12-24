import { ROLE } from './user.constant';

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

export type TRole = keyof typeof ROLE;
