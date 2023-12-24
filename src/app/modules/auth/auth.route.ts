import express from 'express';
import authHelp from '../../middlewares/authHelp';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { AuthControllers } from './auth.controller';
import { LoginValidations } from './auth.validation';

const router = express.Router();
router.post(
  '/login',
  validateZodRequest(LoginValidations.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  authHelp('admin', 'user'),
  validateZodRequest(LoginValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
