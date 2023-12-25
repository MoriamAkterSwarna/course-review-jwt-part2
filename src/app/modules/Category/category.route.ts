import express from 'express';
import authHelp from '../../middlewares/authHelp';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
export const router = express.Router();

router.post(
  '/',
  authHelp('admin'),
  validateZodRequest(CategoryValidation.categoryValidationSchema),
  CategoryController.createCategoryController,
);
router.get(
  '/',
  // authHelp('admin'),
  CategoryController.getAllCategoriesController,
);

export const CategoryRoutes = router;
