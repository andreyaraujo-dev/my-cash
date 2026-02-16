import { signup } from './signup';
import { signin } from './signin';
import { updatePassword } from './updatePassword';
import { deleteAccount } from './deleteAccount';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';

export const authService = {
  signup,
  signin,
  updatePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
};
