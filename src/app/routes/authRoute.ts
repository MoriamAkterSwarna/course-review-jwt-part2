import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';

export const AuthRouter = Router();
const authRoutes = [
  {
    path: '/register',
    route: UserRoutes,
  },
  {
    path: '/',
    route: AuthRoutes,
  },
];
authRoutes.forEach(route => {
  AuthRouter.use(route.path, route.route);
});
