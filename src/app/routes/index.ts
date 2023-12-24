import { Router } from 'express';
import { CategoryRoutes } from '../modules/Category/category.route';
import { ReviewRoutes } from '../modules/Review/review.route';
import { CourseRoutes } from '../modules/course/course.route';
import { UserRoutes } from '../modules/user/user.route';

export const router = Router();
const moduleRoutes = [
  {
    path: '/auth/register',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/',
    route: CourseRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];
moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});
