import { Model } from '../models';
import { nullResponse, conflictResponse } from '../helper/error-handler';
import sendMail from '../helper/mailer';
import Messages from '../helper/messages';

/**
 * @description Loan class of methods for each loan endpoint
 * @exports Loan
 */
class Loan {
  /**
   * @description creates new loan applications
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}  new loan application object
   */
  static Model() {
    return new Model('loans');
  }

  static async loanApply(req, res) {
    const { amount, tenor } = req.body;
    const { firstName, lastName, email } = req.user;

    const interest = 0.05 * amount.toFixed(2);
    const paymentInstallment = Number(((amount + interest) / tenor).toFixed(2));
    const balance = Number((amount + interest).toFixed(2));
    const columns = '"userMail", amount, tenor, interest, "paymentInstallment", balance';
    const values = `'${email}', ${amount}, ${tenor}, ${interest}, ${paymentInstallment}, ${balance}`;

    try {
      const data = await Loan.Model().select('*', `WHERE "userMail"='${email}'`);
      if (data[0] && !data[0].repaid) {
        return conflictResponse(req, res, 'You have a current unrepaid loan');
      }
      const loan = await Loan.Model().insert(columns, `${values}`, 'RETURNING *');
      return res.status(201).json({
        status: 201,
        data: {
          firstName,
          lastName,
          ...loan[0],
        },
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }


  /**
   * @description Retrieves all loans from the data structure
   * and also if query is specified, it return loans that match the specified query
   * @param {object} req request object
   * @param {object} res response object
   * @returns [array] array of loans
   */
  static async getAllLoans(req, res) {
    const { status } = req.query;
    let { repaid } = req.query;

    try {
      if (status && repaid) {
        repaid = JSON.parse(repaid); // parses repaid back to boolean
        const clause = `WHERE status='${status}' AND repaid=${repaid}`;
        const data = await Loan.Model().select('*', clause);
        if (!data[0]) {
          return nullResponse(req, res, 'No loan found');
        }
        return res.status(200).json({
          status: 200,
          data,
        });
      }

      const data = await Loan.Model().select('*');
      return res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }


  /**
   * @description Retrieves a single specified loan
   * @param {object} req request parameter
   * @param {object} res response object {status, data}
   * @returns {object} A specified loan
   */
  static async getALoan(req, res) {
    const { id } = req.params;

    try {
      const data = await Loan.Model().select('*', `WHERE id=${id}`);
      if (data[0]) {
        return res.status(200).json({
          status: 200,
          data: {
            ...data[0],
          },
        });
      }
      return nullResponse(req, res, 'Loan does not exist');
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  /**
   * @description Approves or rejects a loan for a particular user
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} loan application with new status
   */
  static async approveRejectLoan(req, res) {
    const { status } = req.body;
    const { id } = req.params;

    try {
      const data = await Loan.Model().select('*', `WHERE id=${id}`);
      if (!data[0]) {
        return nullResponse(req, res, 'Loan does not exist');
      }
      if (data[0].status === 'approved') {
        return conflictResponse(req, res, 'Loan is approved already');
      }

      const approve = await Loan.Model().update(`status='${status}'`, `WHERE id=${id} RETURNING *`);
      const msg = Messages.loanApprovalMessage(approve[0]);
      sendMail(msg);
      return res.status(200).json({
        status: 200,
        data: approve[0],
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default Loan;
