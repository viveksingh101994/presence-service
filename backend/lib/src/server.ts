import App from './app';
import { routes } from './routing';
import { DBConnector, FireBase } from './db';
async function initService() {
  try {
    await DBConnector.initConnection();
    await FireBase.initConnection();
    const app = new App([routes], process.env.PORT || '3000');
    app.serverListen();
    app.setSocket();
  } catch (err) {
    console.log('Some Error Occured', err);
    process.exit(1);
  }
}

initService();
