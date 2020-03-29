import App from './app';
import { routes } from './routing';
import { DBConnector } from './db';
async function initService() {
  try {
    await DBConnector.initConnection();
    const app = new App([routes], process.env.PORT || '3000');
    app.listen();
  } catch (err) {
    console.log('Some Error Occured', err);
    process.exit(1);
  }
}

initService();
