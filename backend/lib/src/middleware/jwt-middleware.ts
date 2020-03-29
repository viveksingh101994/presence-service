import { Response } from '../common';
import { jwt } from '../common/jwt';

// Need to fix the middleware
export class JWTMiddleware {
  static async verify(req, res, next) {
    if (req.cookies.auth) {
      try {
        const decoded: any = await jwt.verifyandDecodeJwt(req.cookies.auth);
        req.user = decoded.context;
        return next();
      } catch (err) {
        return next(Response.UnAuthorized);
      }
    } else {
      return next(Response.UnAuthorized);
    }
  }
}
