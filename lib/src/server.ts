import App from './app';
import { routes } from './routing';
import { FireBase } from './db';
import { DB } from './db/connector-mongo';
async function initService() {
  try {
    await DB.initConnection();
    await FireBase.initConnection();
    const app = new App([routes], process.env.PORT || '3000');
    app.serverListen();
  } catch (err) {
    console.log('Some Error Occured', err);
    process.exit(1);
  }
}

initService();
