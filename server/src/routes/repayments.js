import express from 'express';
import expressValidator from 'express-validator';
import authorization from '../middleware/authorization';
import Repayment from '../controllers/repayments';
import validation from '../middleware/repayment-validate';


const router = express.Router();
router.use(expressValidator());

const { repaymentRecordValidate } = validation;
const { verifyAdmin } = authorization;
const { generateRepaymentRecord } = Repayment;

router.post('/loans/:id/repayments', verifyAdmin, repaymentRecordValidate, generateRepaymentRecord);

export default router;
