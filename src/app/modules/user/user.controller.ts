import catchAsyncFunc from '../../utils/catchAsyncFunc';
import sendResponseMessage from '../../utils/sendResponse';
import { authUserServices } from './user.services';

const authUserRegister = catchAsyncFunc(async (req, res) => {
  const user = await authUserServices.authUserRegisterIntoDB(req.body);

  sendResponseMessage(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: user,
  });
});

export const authUserControllers = {
  authUserRegister,
};
