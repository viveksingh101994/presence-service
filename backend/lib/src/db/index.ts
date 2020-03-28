import { DBConnector } from './settings';
let mssqlConnector = new DBConnector({ db: 'mssql' });

export { mssqlConnector };
