import catchAsyncFunc from '../../utils/catchAsyncFunc';
import sendResponseMessage from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsyncFunc(async (req, res) => {
  const user = await AuthServices.userLogin(req.body);
  const { accessToken, jwtPayload } = user;
  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: 'User log in successful',
    data: {
      user: jwtPayload,
      token: accessToken,
    },
  });
});
const changePassword = catchAsyncFunc(async (req, res) => {
  // console.log(req.user);
  const { ...passInfo } = req.body;
  const user = await AuthServices.changePassword(req.user, passInfo);
  // console.log(user, 'user');
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
