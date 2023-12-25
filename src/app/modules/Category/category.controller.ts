import { Request, Response } from 'express';
import catchAsyncFunc from '../../utils/catchAsyncFunc';
import sendResponseMessage from '../../utils/sendResponse';
import { CategoryServices } from './category.services';

const createCategoryController = catchAsyncFunc(
  async (req: Request, res: Response) => {
    console.log(req.user);
    const createdBy = req.user.id;
    const result = await CategoryServices.createCategoryIntoDB(
      createdBy,
      req.body,
    );
    console.log(result);

    sendResponseMessage(res, {
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: result,
    });
  },
);
const getAllCategoriesController = catchAsyncFunc(
  async (req: Request, res: Response) => {
    const categories = await CategoryServices.getAllCategoriesFromDB();
    sendResponseMessage(res, {
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: categories,
    });
  },
);

export const CategoryController = {
  createCategoryController,
  getAllCategoriesController,
};
