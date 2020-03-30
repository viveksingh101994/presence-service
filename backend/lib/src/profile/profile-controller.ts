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
      const { payload = null } = req.body;
      if (!payload) {
        return next(Response.InvalidParam);
      }
      const roomUsers = await getUsers(payload);
      const successResponse = Response.Success;
      successResponse.message = [req.user, ...roomUsers];
      return next(successResponse);
    } catch (err) {
      return next(Response.ServerError);
    }
  }
}
