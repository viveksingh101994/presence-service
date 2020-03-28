import { Response } from '../common';

export class ProfileController {
  static async users(req, res, next) {
    next(Response.Success);
  }
}
