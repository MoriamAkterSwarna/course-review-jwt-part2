import { JwtPayload } from 'jsonwebtoken';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (userData: JwtPayload, review: TReview) => {
  // console.log(userData);
  const createdBy = {
    _id: userData.id,
    username: userData.username,
    email: userData.email,
    role: userData.role,
  };
  const newReview = (await Review.create({ ...review, createdBy })).populate(
    'createdBy',
    '-password -passwordHistory -updatePasswordAt -createdAt -updatedAt -__v -id',
  );
  // console.log(newReview, 'newReview');
  return newReview;
};

export const ReviewService = {
  createReviewIntoDB,
};
