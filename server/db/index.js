import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from '../src/helper/debugger';


if (process.env && process.env.NODE_ENV) {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
} else {
  dotenv.config();
}

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  logger(`Connection successful to ${process.env.DATABASE_URL}`);
});

export default {
  query: (text, params) => pool.query(text, params),
};
