import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (createdBy: string, category: TCategory) => {
  const newCategory = await Category.create({ ...category, createdBy });
  return newCategory;
};
const getAllCategoriesFromDB = async () => {
  const categories = await Category.find().populate(
    'createdBy',
    '-password -passwordHistory -updatePasswordAt -createdAt -updatedAt -__v -id',
  );
  return categories;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
