import { loans } from '../models/db';

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
    const {
      firstName, lastName, email, loanAmount, tenor,
    } = req.body;

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
    const user = req.user.email;
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

    const currentLoan = loans.find(loan => loan.user === req.user.email);
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
  static getALoan(req, res) {
    const id = Number(req.params.id);

    const aLoan = loans.find(loan => loan.id === id);
    if (aLoan) {
      return res.status(200).json({
        status: 200,
        data: aLoan,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan does not exist',
    });
  }

  /**
   * @description Approves or rejects a loan for a particular user
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} loan application with new status
   */
  static approveRejectLoan(req, res) {
    const { status } = req.body;
    const id = Number(req.params.id);


    const pending = loans.find(loan => loan.id === id);
    if (pending) {
      pending.status = status;
      const newStatus = {
        loanId: pending.id,
        loanAmount: pending.loanAmount,
        tenor: pending.tenor,
        status: pending.status,
        monthlyInstallment: pending.paymentInstallment,
        interest: pending.interest,
      };
      return res.status(200).json({
        status: 200,
        data: newStatus,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan does not exist',
    });
  }
}

export default Loan;
