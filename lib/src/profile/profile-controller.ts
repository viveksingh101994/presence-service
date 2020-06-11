import { Response } from '../common';
import { getUsers, getvisitedUsers } from './profile-helper';
export class ProfileController {
  static async user(req, res, next) {
    const successResponse = Response.Success;
    successResponse.message = req.user;
    return next(successResponse);
  }

  static async visitedUser(req, res, next) {
    try {
      const successResponse = Response.Success;
      successResponse.message = await getvisitedUsers();
      return next(successResponse);
    } catch (err) {
      next(Response.ServerError);
    }
  }
}
