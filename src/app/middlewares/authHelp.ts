/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import GenericError from '../errors/genericError';
import { verifyToken } from '../modules/auth/auth.utils';
import { TRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsyncFunc from '../utils/catchAsyncFunc';

const authHelp = (...roles: TRole[]) => {
  return catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      //   console.log(token, 'token');

      if (!token) {
        throw new GenericError(
          httpStatus.UNAUTHORIZED,
          'Unauthorized Access!!',
        );
      }
      const decoded = verifyToken(token, config.jwt_access_secret as string);
      const { _id, username, role, email, iat } = decoded;
      //   console.log(decoded, 'decoded');
      const user = await User.findOne(username);
      if (!user) {
        throw new GenericError(httpStatus.NOT_FOUND, 'User not found');
      }

      if (role && !roles.includes(role)) {
        throw new GenericError(
          httpStatus.UNAUTHORIZED,
          'Unauthorized Access!!',
        );
      }
      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default authHelp;
