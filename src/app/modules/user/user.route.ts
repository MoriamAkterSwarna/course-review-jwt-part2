import express from 'express';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { authUserControllers } from './user.controller';
import { UserValidations } from './user.validation';

export const router = express.Router();

router.post(
  '/',
  validateZodRequest(UserValidations.createUserValidationSchema),
  authUserControllers.authUserRegister,
);

export const UserRoutes = router;
