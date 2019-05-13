import express from 'express';
import expressValidator from 'express-validator';
import User from '../controllers/user';
import validation from '../middleware/user-validate';
import authorization from '../middleware/authorization';

const router = express.Router();
router.use(expressValidator());

// Import { method(s) } from class;
const { verifyAdmin } = authorization;
const { signUp, signIn, newUserVerify } = User;
const { signupValidate, signinValidate, newUserVerifyValidate } = validation;


// New user signup
router.post('/auth/signup', signupValidate, signUp);

// User signin
router.post('/auth/signin', signinValidate, signIn);

// User verification
router.patch('/users/:email/verify', verifyAdmin, newUserVerifyValidate, newUserVerify);

export default router;
