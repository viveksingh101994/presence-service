import { Response } from '../common';
import { getUsers, updatePageVisit, getvisitedUsers } from './profile-helper';
export class ProfileController {
  static async user(req, res, next) {
    try {
      const successResponse = Response.Success;
      successResponse.message = req.user;
      await updatePageVisit(req.user);
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
      successResponse.message = roomUsers;
      return next(successResponse);
    } catch (err) {
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
