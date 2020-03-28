import App from './app';
import { routes } from './routing';
import { mssqlConnector } from './db';

async function initService() {
  try {
    await mssqlConnector.checkConnection();
    const app = new App([routes], process.env.PORT || '3000');
    app.listen();
  } catch (err) {
    console.log('Some Error Occured', err);
    process.exit(1);
  }
}

initService();
