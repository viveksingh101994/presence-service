import { DBConfig } from './config';
import * as knexInstance from 'knex';

export class DBConnector {
  db: string;
  knexInstance: any;

  constructor(options) {
    this.db = options.db;
    this.knexInstance = knexInstance({
      client: this.db,
      connection: DBConfig.mssql,
      acquireConnectionTimeout: 10000,
    });
  }

  async checkConnection() {
    try {
      await this.knexInstance.select(1);
    } catch (error) {
      console.log(`${this.db} Connection Error`, error);
      throw error;
    }
  }
}
