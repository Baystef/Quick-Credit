import logger from '../helper/debugger';
import { loans } from '../models/db';
import db from '../../db';

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
  static loanApply(req, res) {
    const { loanAmount, tenor } = req.body;
    const { firstName, lastName, email } = req.user;

    const loanId = loans.length + 1;
    const interest = 0.05 * loanAmount.toFixed(2);
    const paymentInstallment = Number(((loanAmount + interest) / tenor).toFixed(2));
    const balance = Number((loanAmount + interest).toFixed(2));
    const repaid = false;
    const status = 'pending';
    const createdOn = new Date().toLocaleString();

    // Loan data returned to user
    const loanApplied = {
      loanId,
      firstName,
      lastName,
      email,
      loanAmount,
      tenor,
      interest,
      paymentInstallment,
      balance,
      repaid,
      createdOn,
      status,
    };


    const id = loanApplied.loanId;
    const user = email;
    // Loan data stored in data structure
    const newLoan = {
      id,
      user,
      loanAmount,
      interest,
      paymentInstallment,
      balance,
      tenor,
      repaid,
      createdOn,
      status,
    };

    const currentLoan = loans.find(loan => loan.user === email);
    if (currentLoan) {
      return res.status(409).json({
        status: 409,
        error: 'You have a current unrepaid loan',
      });
    }

    loans.push(newLoan);
    return res.status(201).json({
      status: 201,
      data: loanApplied,
    });
  }

  /**
   * @description Retrieves all loans from the data structure
   * and also if query is specified, it return loans that match the specified query
   * @param {object} req request object
   * @param {object} res response object
   * @returns [array] array of loans
   */
  static getAllLoans(req, res) {
    const { status } = req.query;
    let { repaid } = req.query;

    if (status && repaid) {
      // parses repaid back to boolean
      repaid = JSON.parse(repaid);

      const approved = loans.filter(loan => loan.status === status && loan.repaid === repaid);
      return res.status(200).json({
        status: 200,
        data: approved,
      });
    }
    return res.status(200).json({
      status: 200,
      data: loans,
    });
  }

  /**
   * @description Retrieves a single specified loan
   * @param {object} req request parameter
   * @param {object} res response object {status, data}
   * @returns {object} A specified loan
   */
  static async getALoan(req, res) {
    const { id } = req.params;
    const oneLoanQuery = 'SELECT * FROM loans WHERE id=$1';

    try {
      const { rows } = await db.query(oneLoanQuery, [id]);
      logger(rows);
      if (rows[0]) {
        return res.status(200).json({
          status: 200,
          data: {
            ...rows[0],
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Loan does not exist',
      });
    } catch (error) {
      return res.status(400).send(error);
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

    const oneLoanQuery = 'SELECT * FROM loans WHERE id=$1';
    const values = [status, id];

    try {
      const { rows } = await db.query(oneLoanQuery, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Loan does not exist',
        });
      }
      if (rows[0].status === 'approved') {
        return res.status(409).json({
          status: 409,
          error: 'Loan is approved already',
        });
      }

      const approveQuery = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING *';
      const approve = await db.query(approveQuery, values);
  
      return res.status(200).json({
        status: 200,
        data: approve.rows[0],
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default Loan;
