import express from 'express';
import authorization from '../middleware/authorization';
import { Repayment } from '../controllers';
import validation from '../middleware/repayment-validate';

const repayRouter = express.Router();

// Import { method(s) } from class;
const { repaymentRecordValidate, historyRepaymentValidate } = validation;
const { verifyAdmin, verifyUser } = authorization;
const { generateRepaymentRecord, getRepaymentHistory } = Repayment;

// Generate repayment record
repayRouter.post('/:id/repayments', verifyAdmin, repaymentRecordValidate, generateRepaymentRecord);

// Get repayment record
repayRouter.get('/:id/repayments', verifyUser, historyRepaymentValidate, getRepaymentHistory);

export default repayRouter;
