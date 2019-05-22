import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from '../src/helper/debugger';

dotenv.config();

const connectionString = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  logger(`Connection successful to ${connectionString}`);
});

export default {
  query: (text, params) => pool.query(text, params),
};
