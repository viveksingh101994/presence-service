import { Response } from '../common';
import { getUsers, getvisitedUsers } from './profile-helper';
export class ProfileController {
  static async user(req, res, next) {
    const successResponse = Response.Success;
    successResponse.message = req.user;
    return next(successResponse);
  }

  static async room(req, res, next) {
    try {
      const { payload = null } = req.body;
      if (!payload) {
        return next(Response.InvalidParam);
      }
      const roomUsers = await getUsers(payload);
      const successResponse = Response.Success;
      successResponse.message = roomUsers;
      return next(successResponse);
    } catch (err) {
      console.log('Room=>', err);
      return next(Response.ServerError);
    }
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
