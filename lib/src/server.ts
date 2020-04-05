import App from './app';
import { routes } from './routing';
import { FireBase } from './db';
import { DB } from './db/connector-mongo';
import * as socketIO from 'socket.io';
import { ioConnection } from './socket';

async function initService() {
  try {
    await DB.initConnection();
    await FireBase.initConnection();
    const express = new App([routes], process.env.PORT || '3000');
    express.serverListen();
    ioConnection(express.server);
  } catch (err) {
    console.log('Some Error Occured', err);
    process.exit(1);
  }
}

initService();
