import { z } from 'zod';

export const categoryValidationSchema = z.object({
  name: z.string(),
  createdBy: z.string(),
});

export const CategoryValidation = {
  categoryValidationSchema,
};
