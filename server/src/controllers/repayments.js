// import logger from '../helper/debugger';
import Model from '../models';
import { nullResponse, badRequestResponse, forbiddenResponse } from '../helper/error-handler';

/**
 * @description Collection of methods that generates and retrieves repayment record
 * @exports Repayments
 */

class Repayments {
  /**
   * @description  Creates the Repayments Model instance
   */
  static repayModel() {
    return new Model('repayments');
  }

  /**
   * @description Creates the Loans Model instance
   */
  static loanModel() {
    return new Model('loans');
  }

  /**
   * @description Generates new loan repayment records
   * @param {object} req request object
   * @param {object}  res response object
   * @returns {object} new loan repayment record
   */
  static async generateRepaymentRecord(req, res) {
    const id = Number(req.params.id);
    const { paidAmount } = req.body;

    try {
      const data = await Repayments.loanModel().select('*', `WHERE id=${id}`);
      if (!data[0]) {
        return nullResponse(req, res, 'Loan does not exist');
      }
      if (data[0].repaid) {
        return badRequestResponse(req, res, 'Loan has been fully repaid');
      }
      if (paidAmount > data[0].balance) {
        return badRequestResponse(req, res, 'Payment is more than balance');
      }
      if (paidAmount < data[0].paymentInstallment) {
        return badRequestResponse(
          req,
          res,
          `Minimum payment for this user is ${data[0].paymentInstallment}`,
        );
      }

      const newBalance = data[0].balance - paidAmount;
      if (newBalance === 0) {
        await Repayments.loanModel().update('repaid=true', `WHERE id=${id}`);
      }
      const balance = newBalance;
      const updateLoan = await Repayments.loanModel().update(`balance=${newBalance}`, `WHERE id=${id} RETURNING *`);
      const columns = '"loanId", "paidAmount", balance, amount';
      const values = `${id}, ${paidAmount}, ${balance}, ${data[0].amount}`;
      const repaid = await Repayments.repayModel().insert(columns, values, 'RETURNING *');
      const monthlyInstallment = updateLoan[0].paymentInstallment;
      const newRecord = {
        ...repaid[0],
        monthlyInstallment,
        balance,
      };
      return res.status(201).json({
        status: 201,
        data: newRecord,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  /**
   * @description Retrieves repayment records
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}  repayment record object
   */
  static async getRepaymentHistory(req, res) {
    const { id } = req.params;
    const loanId = Number(id);
    const { email } = req.user;

    try {
      const data = await Repayments.loanModel().select('*', `WHERE id=${loanId}`);
      if (data[0] && data[0].userMail !== email) {
        return forbiddenResponse(req, res, 'Access Denied');
      }
      const columns = `repayments.id, "loanId", repayments."createdOn", repayments."paidAmount", repayments.balance, 
      loans.amount, loans."paymentInstallment"`;
      const clause = `JOIN loans ON loans.id = "loanId"
      WHERE "loanId"=${loanId}`;
      const history = await Repayments.repayModel().select(columns, clause);
      if (!history[0]) {
        return nullResponse(req, res, 'You have no repayment history');
      }
      return res.status(200).json({
        status: 200,
        data: history,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default Repayments;
