import express from 'express';
import authorization from '../middleware/authorization';
import { Loan } from '../controllers';
import validation from '../middleware/loan-validate';

const loanRouter = express.Router();

// Import { method(s) } from class;
const { verifyUser, verifyAdmin } = authorization;
const {
  loanApplyValidate, approvedValidate, oneLoanValidate, approveRejectValidate,
} = validation;
const {
  loanApply, getAllLoans, getALoan, approveRejectLoan,
} = Loan;

// Create loan application
loanRouter.post('/', verifyUser, loanApplyValidate, loanApply);

// Get all loan applications or get repaid and unrepaid loans if query is provided
loanRouter.get('/', verifyAdmin, approvedValidate, getAllLoans);

// Get a specific loan application
loanRouter.get('/:id', verifyAdmin, oneLoanValidate, getALoan);

// Approve or reject a loan application
loanRouter.patch('/:id', verifyAdmin, approveRejectValidate, approveRejectLoan);


export default loanRouter;
