import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import GenericError from '../../errors/genericError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const userLogin = async (payload: TLoginUser) => {
  console.log(payload);
  const isUserExists = await User.findOne(
    { username: payload?.username },
    // { password: 0 },
  );
  //   console.log(isUserExists);
  if (!isUserExists) {
    throw new GenericError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  //   console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new GenericError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    id: isUserExists?._id.toString(),
    role: isUserExists?.role,
    email: isUserExists?.email,
  };
  //   console.log(jwtPayload);

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  //   console.log(accessToken);
  return { jwtPayload, accessToken };
};
const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  //   console.log(payload, 'payload');
  //   console.log(user, 'user');
  const isUserExists = await User.findOne({ _id: user.id });
  //   console.log(isUserExists, 'isUserExists');
  // //   console.log(isUserExists);
  if (!isUserExists) {
    throw new GenericError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.oldPassword,
    isUserExists?.password,
  );
  //   console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new GenericError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const newHashPass = await bcrypt.hash(
    payload?.newPassword,
    Number(config.salt_rounds),
  );

  const updatedUser = await User.findByIdAndUpdate(
    {
      _id: user.id,
      role: user.role,
      email: user.email,
    },
    {
      password: newHashPass,
    },
  ).select('-password');
  //   console.log(updatedUser, 'updatedUser');
  return updatedUser;
};

export const AuthServices = {
  userLogin,
  changePassword,
};
