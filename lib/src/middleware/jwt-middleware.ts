import { Response } from '../common';
import { Response as IResponse } from 'express';
import { jwt } from '../common/jwt';

// Need to fix the middleware
export class JWTMiddleware {
  static async verify(req, res: IResponse, next) {
    if (req.cookies.auth) {
      try {
        const decoded: any = await jwt.verifyandDecodeJwt(req.cookies.auth);
        req.user = decoded;
        return next();
      } catch (err) {
        res.clearCookie('auth');
        res.clearCookie('validToken');
        return next(Response.UnAuthorized);
      }
    } else {
      return next(Response.UnAuthorized);
    }
  }
}
