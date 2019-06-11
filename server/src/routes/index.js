import express from 'express';
import loanRouter from './loans';
import repayRouter from './repayments';
import userRouter from './users';

const routes = express.Router();

routes.use('/loans', loanRouter);
routes.use('/loans', repayRouter);
routes.use('/', userRouter);

export default routes;
