import { Pool, types } from 'pg';
import dotenv from 'dotenv';
import logger from '../helper/debugger';

dotenv.config();
types.setTypeParser(1700, value => parseFloat(value));

const connectionString = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});


class Model {
  constructor(table) {
    this.table = table;
    this.pool = pool;
    this.pool.on('connect', () => {
      logger(`Connection successful to ${connectionString}`);
    });
    this.pool.on('error', (err, client) => {
      logger('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async select(columns, clause) {
    const query = `SELECT ${columns} FROM ${this.table} ${clause}`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async insert(columns, values, clause) {
    const query = `INSERT INTO ${this.table}(${columns}) VALUES(${values}) ${clause}`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async update(columns, clause) {
    const query = `UPDATE ${this.table} SET ${columns} ${clause}`;
    const data = await this.pool.query(query);
    return data.rows;
  }
}

export { pool, Model };
