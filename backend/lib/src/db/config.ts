export class DBConfig {
  static readonly mssql = {
    host: process.env.MSSQL_HOST,
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASS,
    database: process.env.MSSQL_NAME,
    options: {
      encrypt: true,
      packetSize: 32768,
    },
  };
}
