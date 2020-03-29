import { Response, Utils } from '../common';
import { registerUser, authenticateUser } from './user-helper';
import { jwt } from '../common/jwt';
import { Response as IResponse } from 'express';
// import { UserHelper } from './user-helper';

export class UserController {
  static async authenticate(req, res, next) {
    const user = req.body.payload;
    try {
      if (!user.email || !user.password) {
        return next(Response.InvalidParam);
      }
      const authenticatedUser = await authenticateUser(user);
      if (authenticatedUser) {
        const jwtData = await UserController.common(res, authenticatedUser);
        const successResponse = Response.Success;
        successResponse.message = jwtData;
        return next(successResponse);
      } else {
        return next(Response.InvalidParam);
      }
    } catch (err) {
      if (err.code && err.message) {
        const response = Response.FireBase;
        response.message = {
          code: err.code,
          message: err.message,
        };
        return next(response);
      }
      // tslint:disable-next-line:no-console
      console.log('User Controller, authenticate====>', err);
      return next(Response.ServerError);
    }
  }

  private static async common(res, userObj) {
    const userSnapshot = await userObj.get();
    const snapShotData = userSnapshot.data();
    const jwtData = {
      email: snapShotData.email,
      displayName: snapShotData.displayName,
    };
    const xUser = await jwt.generateJwtForUser(jwtData);
    res.cookie('auth', xUser, {
      httpOnly: true,
    });
    return xUser;
  }

  static async register(req, res: IResponse, next) {
    const user = req.body.payload;
    if (!UserController.validateParams(user)) {
      return next(Response.InvalidParam);
    }
    try {
      const userObj = await registerUser(user);
      if (userObj) {
        const jwtData = await UserController.common(res, userObj);
        const successResponse = Response.Success;
        successResponse.message = jwtData;
        return next(successResponse);
      } else {
        return next(Response.InvalidParam);
      }
    } catch (err) {
      if (err.code && err.message) {
        const response = Response.FireBase;
        response.message = {
          code: err.code,
          message: err.message,
        };
        return next(response);
      }
      // tslint:disable-next-line:no-console
      console.log('User Controller, register====>', err);
      return next(Response.ServerError);
    }
  }

  private static validateParams(user) {
    if (
      !user ||
      !user.email ||
      !Utils.isEmailValid(user.email) ||
      !user.password ||
      !user.displayName
    ) {
      return false;
    }
    return true;
  }
}
