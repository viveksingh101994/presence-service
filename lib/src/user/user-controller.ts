import { Response, Utils, generateUUID, getImgTypeAndString } from '../common';
import { registerUser, authenticateUser } from './user-helper';
import { jwt } from '../common/jwt';
import { Response as IResponse } from 'express';
import { FireBase } from '../db';
export class UserController {
  static logOut(req, res: IResponse, next) {
    res.clearCookie('auth');
    res.clearCookie('validToken');
    return next(Response.Success);
  }
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
        return next(Response.UnAuthorized);
      }
    } catch (err) {
      if (err.code && err.message) {
        const response = Response.FireBase;
        response.message = {
          code: err.code,
          message: err.message
        };
        return next(response);
      }
      // tslint:disable-next-line:no-console
      console.log('User Controller, authenticate====>', err);
      return next(Response.ServerError);
    }
  }

  private static async common(res: IResponse, userObj) {
    const jwtData = {
      avatarUrl: userObj.avatarUrl,
      email: userObj.email,
      displayName: userObj.displayName,
      uid: userObj.uid
    };
    const xUser = await jwt.generateJwtForUser(jwtData);
    res.cookie('auth', xUser, {
      httpOnly: true,
      sameSite: 'lax'
    });
    res.cookie('validToken', true, {
      httpOnly: false,
      sameSite: 'lax'
    });
    return jwtData;
  }

  static async register(req, res: IResponse, next) {
    const { payload } = req.body;
    if (!UserController.validateParams(payload)) {
      return next(Response.InvalidParam);
    }
    try {
      const user = {
        ...payload,
        uid: generateUUID()
      };
      if (user.avatarUrl) {
        user.avatarUrl = await FireBase.uploadPicture(
          getImgTypeAndString(user.avatarUrl)
        );
      }
      const userObj = await registerUser(user);
      if (userObj) {
        const jwtData = await UserController.common(res, user);
        const successResponse = Response.Success;
        successResponse.message = jwtData;
        return next(successResponse);
      } else {
        return next(Response.UserAlreadyExist);
      }
    } catch (err) {
      if (err.code && err.message) {
        const response = Response.FireBase;
        response.message = {
          code: err.code,
          message: err.message
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
