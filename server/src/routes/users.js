import express from 'express';
import { User } from '../controllers';
import validation from '../middleware/user-validate';
import authorization from '../middleware/authorization';

const userRouter = express.Router();

// Import { method(s) } from class;
const { verifyAdmin } = authorization;
const {
  signUp, signIn, resetPassword, forgotPassword, newUserVerify,
} = User;
const {
  signupValidate, signinValidate, resetPasswordValidate,
  forgotPasswordValidate, newUserVerifyValidate,
} = validation;


// New user signup
userRouter.post('/auth/signup', signupValidate, signUp);

// User signin
userRouter.post('/auth/signin', signinValidate, signIn);

// Reset password
userRouter.post('/auth/reset_password/:token', resetPasswordValidate, resetPassword);

// Forgot password route
userRouter.post('/auth/forgot_password', forgotPasswordValidate, forgotPassword);

// User verification
userRouter.patch('/users/:email/verify', verifyAdmin, newUserVerifyValidate, newUserVerify);

export default userRouter;
