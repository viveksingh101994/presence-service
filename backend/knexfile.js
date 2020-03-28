// this file would be used for  the migrations
let enableSSL = true
if(process.env.NODE_ENV === 'local') {
  enableSSL = false
  // load config for dev from .env file
  try {
    require("dotenv").config();
  } catch (e) {
    console.warn("Env file not loaded", e);
  }

}


module.exports = {
    client: 'mssql',
    connection: {
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASS,
      database: process.env.SQL_NAME,
      ssl: enableSSL,
      options: {
        encrypt: true
      }
   },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};