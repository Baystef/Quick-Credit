import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from '../helper/debugger';

dotenv.config();

const connectionString = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;


class Model {
  constructor(table) {
    this.table = table;
    this.pool = new Pool({
      connectionString,
    });
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

export default Model;
