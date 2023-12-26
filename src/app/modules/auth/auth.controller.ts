import catchAsyncFunc from '../../utils/catchAsyncFunc';
import sendResponseMessage from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsyncFunc(async (req, res) => {
  const user = await AuthServices.userLogin(req.body);
  const { username, accessToken, jwtPayload } = user;
  const userData = { username, ...jwtPayload };
  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: 'User log in successful',
    data: {
      user: userData,
      token: accessToken,
    },
  });
});
const changePassword = catchAsyncFunc(async (req, res) => {
  console.log(req.user, 'req.user');
  // const { ...passInfo } = req.body;
  const user = await AuthServices.changePassword(req.user, req.body);
  console.log(user, 'user');
  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: 'Password Changed successfully',
    data: user,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
