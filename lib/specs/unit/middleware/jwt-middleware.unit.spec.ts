import { JWTMiddleware } from '../../../src/middleware/jwt-middleware';
import { expect } from 'chai';
import { Response } from '../../../src/common';
import { jwt } from '../../../src/common/jwt';
process.env.JWT_EXPIRE_PERIOD_IN_SECONDS = '6000';
describe('JWT Middleware', () => {
  it('should send unauthorize if there is no cookie auth', () => {
    const req = {
      cookies: {
        auth: null
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.UnAuthorized.status);
      expect(response.message.message).to.be.equal(
        Response.UnAuthorized.message.message
      );
    };
    JWTMiddleware.verify(req, null, next);
  });

  it('should send decode the jwt if valid jwt is present in cookie auth', async () => {
    const jwtAuth = await jwt.generateJwtForUser({ abcd: 'sss' });
    const req = {
      cookies: {
        auth: jwtAuth
      },
      user: {}
    };
    const next = () => {
      expect(req.user).to.be.instanceOf(Object);
    };
    await JWTMiddleware.verify(req, null, next);
  });

  it('should send unauthorize for invalid jwt', async () => {
    const req = {
      cookies: {
        auth: '1221213asd'
      },
      user: {}
    };
    const res = {
      clearCookie: () => {}
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.UnAuthorized.status);
      expect(response.message.message).to.be.equal(
        Response.UnAuthorized.message.message
      );
    };
    await JWTMiddleware.verify(req, res, next);
  });
});
