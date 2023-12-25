import express from 'express';
import authHelp from '../../middlewares/authHelp';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';
export const router = express.Router();

router.post(
  '/course',
  authHelp('admin'),
  validateZodRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/courses', CourseController.getAllCourses);
router.put(
  '/courses/:courseId',
  validateZodRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.get('/courses/:courseId/reviews', CourseController.getCourseAndReviews);
router.get('/course/best', CourseController.getBestCourses);

export const CourseRoutes = router;
