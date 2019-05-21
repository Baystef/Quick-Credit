import '@babel/polyfill';
import db from '../../db';
import logger from '../helper/debugger';

const Migration = {
  async migrate() {
    logger('Creating User table');
    await db.query(`
    CREATE TABLE IF NOT EXISTS 
    users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        phoneNumber SMALLINT,
        homeAddress VARCHAR(100) NOT NULL,
        workAddress VARCHAR(100) NOT NULL,
        status TEXT DEFAULT 'unverified',
        isAdmin BOOLEAN DEFAULT false,
        createdOn TIMESTAMP
    );
    `);

    logger('Creating Loan table');
    await db.query(`
    CREATE TABLE IF NOT EXISTS 
    loans (
      id SERIAL PRIMARY KEY,
      FOREIGN KEY (userMail) REFERENCES users (email) ON DELETE CASCADE,
      tenor SMALLINT NOT NULL,
      status TEXT DEFAULT 'pending',
      repaid BOOLEAN DEFAULT false,
      amount NUMERIC NOT NULL,
      paymentInstallment NUMERIC NOT NULL,
      balance NUMERIC NOT NULL,
      createdOn TIMESTAMP
    );
    `);

    logger('Creating repayment table');
    await db.query(`
    CREATE TABLE IF NOT EXISTS 
    repayments(
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP,
        FOREIGN KEY (loanId) REFERENCES loans (id) ON DELETE CASCADE,
        amount NUMERIC NOT NULL
    );
    `);
  },
};

export default Migration;

Migration.migrate();
