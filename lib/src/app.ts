import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { Response } from './common';
import * as http from 'http';
import * as cors from 'cors';
import * as path from 'path';
import { corsSettings } from './db/config';
class App {
  app: express.Application;
  port: number;
  private server: any;
  constructor(routes, port) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(routes);
    this.initializeClient(routes);
    this.initializeErrorHandler();
    this.initializeResponseHandler();
  }
  serverListen() {
    this.server.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(this.loggerMiddleware);
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.app.use(
      cors({
        origin: corsSettings.origin,
        credentials: true
      })
    );
    this.app.use(cookieParser());
  }

  private initializeControllers(routes) {
    routes.forEach((route) => {
      this.app.use(route);
    });
  }

  private initializeClient(routes) {
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(path.join(__dirname, '../client/build')));
      this.app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
      });
    }
  }

  private loggerMiddleware(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    // tslint:disable-next-line:no-console
    console.log(`${request.method} ${request.path}`);
    next();
  }

  private initializeErrorHandler() {
    this.app.use((errObj, req, res, next) => {
      let errorResp = errObj;
      if (errObj instanceof Error) {
        errorResp = Response.ServerError;
        errorResp.err = errObj;
      }
      next(errorResp);
    });
  }

  private initializeResponseHandler() {
    this.app.use((resData, req, res, next) => {
      if (resData.status === 200) {
        res.send(resData.message);
      } else if (resData.status === 302) {
        res.redirect(resData.message.url);
      } else {
        res.status(resData.status);
        res.json(resData.message);
      }
    });
  }
}

export default App;
