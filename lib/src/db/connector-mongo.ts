import * as mongoose from 'mongoose';
import { mongoDB } from './config';

export class DB {
  static async initConnection() {
    const connectionUri = `${mongoDB.connectionString}/${mongoDB.dbName}`;
    try {
      await mongoose.connect(connectionUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database Connected =>', mongoDB.dbName);
    } catch (err) {
      console.log('Connection Error=>', err);
      process.exit(1);
    }
  }
}
