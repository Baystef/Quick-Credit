import { loans, repayments } from '../models/db';

/**
 * @description Collection of methods that generates and retrieves repayment record
 * @exports Repayments
 */

class Repayments {
  /**
   * @description Generates new loan repayment records
   * @param {object} req request object
   * @param {object}  res response object
   * @returns {object} new loan repayment record
   */
  static generateRepaymentRecord(req, res) {
    const id = Number(req.params.id);
    const loanFound = loans.find(loan => loan.id === id);


    if (loanFound) {
      const loanId = loanFound.id;
      const amount = loanFound.loanAmount;
      const createdOn = new Date().toLocaleString();
      const monthlyInstallment = loanFound.paymentInstallment;
      const paidAmount = loanFound.paymentInstallment;
      const newBalance = loanFound.balance - paidAmount;

      const newRecord = {
        id: repayments.length + 1,
        loanId,
        createdOn,
        amount,
        monthlyInstallment,
        paidAmount,
        balance: newBalance,
      };

      loanFound.balance = newBalance;
      if (loanFound.balance <= 0) {
        loanFound.repaid = true;
        return res.status(200).json({
          status: 200,
          error: 'Loan has been fully repaid',
        });
      }

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

  /**
   * @description Retrieves repayment records
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}  repayment record object
   */
  static getRepaymentHistory(req, res) {
    const id = Number(req.params.id);

    const history = repayments.filter(repayment => repayment.loanId === id);


    if (history) {
      return res.status(200).json({
        status: 200,
        data: history,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'You have no repayment history',
    });
  }
}

export default Repayments;
