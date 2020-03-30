import { Response } from '../common';
import { getUsers } from './profile-helper';
export class ProfileController {
  static async user(req, res, next) {
    try {
      const successResponse = Response.Success;
      successResponse.message = req.user;
      return next(successResponse);
    } catch (err) {
      return next(Response.ServerError);
    }
  }

  static async room(req, res, next) {
    try {
      const { users = null } = req.body;
      if (!users) {
        return next(Response.InvalidParam);
      }
      const roomUsers = await getUsers(users);
      const successResponse = Response.Success;
      successResponse.message = [req.user, ...roomUsers];
      return next(successResponse);
    } catch (err) {
      return next(Response.ServerError);
    }
  }
}
