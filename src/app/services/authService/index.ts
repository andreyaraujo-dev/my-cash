import { signup } from './signup';
import { signin } from './signin';
import { updatePassword } from './updatePassword';
import { deleteAccount } from './deleteAccount';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { mfaSetup } from './mfaSetup';
import { mfaVerifySetup } from './mfaVerifySetup';
import { mfaVerify } from './mfaVerify';
import { mfaDisable } from './mfaDisable';

export const authService = {
  signup,
  signin,
  updatePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
  mfaSetup,
  mfaVerifySetup,
  mfaVerify,
  mfaDisable,
};
