import * as express from 'express';
import { RouteType, Utils } from '../common';
import { JWTMiddleware } from '../middleware/jwt-middleware';
import { ProfileController } from './profile-controller';

const router = express.Router();

router.get(
  Utils.getRoutePrefix(RouteType.private, '/user'),
  JWTMiddleware.verify,
  ProfileController.user
);

router.get(
  Utils.getRoutePrefix(RouteType.private, '/visted-users'),
  JWTMiddleware.verify,
  ProfileController.visitedUser
);

export const profileRoutes = router;
