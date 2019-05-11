import { loans, repayments } from '../db';

/**
 * @class RepaymentController
 * @description Collection of methods that generates and retrieves repayment record
 */

class Repayments {
  static generateRepaymentRecord(req, res) {
    const id = Number(req.params.id);
    const paidAmount = Number(req.body.paidAmount);
    const loanFound = loans.find(loan => loan.id === id);


    if (loanFound) {
      // If amount repaid is greater than repayment due
      if (paidAmount > loanFound.balance) {
        return res.status(400).json({
          status: 400,
          error: 'Amount paid is more than Repayment due',
        });
      }

      const newBalance = loanFound.balance - paidAmount;

      const newRecord = {
        id: repayments.length + 1,
        loanId: loanFound.id,
        createdOn: loanFound.createdAt,
        amount: loanFound.loanAmount,
        monthlyInstallments: loanFound.paymentInstallment,
        paidAmount,
        balance: newBalance,
      };

      loanFound.balance = newBalance;
      if (loanFound.balance === 0) loanFound.repaid = true;

      repayments.push(newRecord);

      return res.status(201).json({
        status: 201,
        data: newRecord,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'Loan does not exist',
    });
  }
}

export default Repayments;
