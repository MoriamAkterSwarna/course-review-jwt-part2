/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import GenericError from '../../errors/genericError';
import JWTError from '../../errors/jwtError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const userLogin = async (payload: TLoginUser) => {
  console.log(payload);
  const isUserExists = await User.findOne({
    username: payload?.username,
  }).select('+password +passwordHistory +updatePasswordAt');
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
  payload: { currentPassword: string; newPassword: string },
) => {
  const { username, iat } = user;
  const isUserExists = await User.findOne({ _id: user.id }).select(
    '+password +passwordHistory +updatePasswordAt',
  );
  // console.log(isUserExists, 'isUserExists');
  if (!isUserExists) {
    throw new GenericError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!iat) {
    throw new GenericError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  // console.log(isUserExists.updatePasswordAt, 'isUserExists.updatePasswordAt');

  const newPassword = payload?.newPassword;
  // console.log(newPassword, 'new pass');

  const passwordHistory = isUserExists.passwordHistory || [];
  const lastTwoPassExists = passwordHistory.slice(-3);
  // console.log(lastTwoPassExists, 'lastTwoPassExists');
  const isLastTwoPassMatched = await Promise.all(
    lastTwoPassExists.map(elem => bcrypt.compare(newPassword, elem.password)),
  ).then(results => results.includes(true));
  // console.log(isLastTwoPassMatched, 'isLastTwoPassMatched');
  if (isLastTwoPassMatched) {
    const lastPasswordChange =
      lastTwoPassExists[lastTwoPassExists.length - 1].updatePasswordAt;
    const formattedDate = `${lastPasswordChange.getDate()}-${
      lastPasswordChange.getMonth() + 1
    }-${lastPasswordChange.getFullYear()} at ${lastPasswordChange.getHours()}:${lastPasswordChange.getMinutes()}`;
    throw new JWTError(
      httpStatus.UNAUTHORIZED,
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedDate}).`,
      null,
    );
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
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
  const passWithUpdatedTime = [
    ...passwordHistory,
    {
      password: newHashPass,
      updatePasswordAt: new Date(),
    },
  ];

  const updatedUser = await User.findByIdAndUpdate(
    {
      _id: user.id,
      role: user.role,
      email: user.email,
    },
    {
      password: newHashPass,
      passwordHistory: passWithUpdatedTime,
      updatePasswordAt: new Date(),
    },
    {
      new: true,
    },
  ).select('-password -passwordHistory -updatePasswordAt');
  // console.log(updatedUser, 'updatedUser');
  return updatedUser;
};

export const AuthServices = {
  userLogin,
  changePassword,
};
