import express from 'express';
import authHelp from '../../middlewares/authHelp';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
export const router = express.Router();

router.post(
  '/',
  authHelp('user'),
  validateZodRequest(ReviewValidation.reviewValidationSchema),
  ReviewController.createReview,
);

export const ReviewRoutes = router;
