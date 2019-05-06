import express from 'express';
import expressValidator from 'express-validator';
import User from '../controllers/user';
import validation from '../middleware/user-validate';

const router = express.Router();
router.use(expressValidator());

router.post('/signup', validation.signupValidate, User.signUp);
router.post('/signin', validation.signinValidate, User.signIn);

export default router;
