import { Response } from '../common';

export class ProfileController {
  static async users(req, res, next) {
    const successResponse = Response.Success;
    successResponse.message = req.user;
    return next(successResponse);
  }
}
