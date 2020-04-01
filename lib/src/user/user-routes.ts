import * as express from 'express';
import { RouteType, Utils } from '../common';
import { UserController } from './user-controller';

const router = express.Router();

router.post(
  Utils.getRoutePrefix(RouteType.public, '/authenticate'),
  UserController.authenticate
);

// http://localhost:3000/api/public/register
router.post(
  Utils.getRoutePrefix(RouteType.public, '/register'),
  UserController.register
);

router.get(
  Utils.getRoutePrefix(RouteType.public, '/logout'),
  UserController.logOut
);

export const userRoutes = router;
