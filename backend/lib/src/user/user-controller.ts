import { Response, Utils } from '../common';
// import { UserHelper } from './user-helper';

export class UserController {
  static async authenticate(req, res, next) {
    const user = req.body;
    try {
      //   const userExist = await UserHelper.authenticateUser(user);
      //   if (userExist) {
      //     const userJWT = await UserHelper.generateJWT(userExist);
      //     if (userJWT) {
      //       res.set('X-USER', userJWT);
      //       const response = Response.Success;
      //       response.message = userExist;
      //       return next(response);
      //     }
      //   }
      return next(Response.InvalidParam);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log('User Controller, authenticate====>', err);
      return next(Response.ServerError);
    }
  }

  static async register(req, res, next) {
    const user = req.body;
    if (!(await UserController.validateParams(user))) {
      return next(Response.InvalidParam);
    }
    try {
      //   const userRegistered = await UserHelper.register(user);
      //   if (userRegistered) {
      //     return next(Response.Success);
      //   } else {
      //     return next(Response.UnAuthorized);
      //   }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log('User Controller, register====>', err);
      return next(Response.ServerError);
    }
  }

  private static async validateParams(user) {
    if (
      !user.email ||
      !Utils.isEmailValid(user.email) ||
      !user.name ||
      !user.password ||
      !user.displayName
    ) {
      return false;
    }
    return true;
  }
}
