import * as sinon from 'sinon';
import { expect } from 'chai';
import { UserController } from '../../../src/user/user-controller';
import { Response } from '../../../src/common';
import { getUserByEmailMock } from '../../mocks/user-queries.mock';
import { UserQueries } from '../../../src/user/user-queries';
import { setPassword } from '../../../src/user/model/user-model';
import { Response as IResponse } from 'express';
import { FireBase } from '../../../src/db';

describe('User Controller=> Authentication', () => {
  let stubArr = [];
  beforeEach((done) => {
    stubArr.push(
      sinon.stub(UserQueries, 'getUserByEmail').callsFake(getUserByEmailMock)
    );
    stubArr.push(
      sinon.stub(UserQueries, 'updateLastLogin').callsFake(() => {
        return Promise.resolve({});
      })
    );
    done();
  });
  afterEach((done) => {
    stubArr.forEach((stub) => {
      stub.restore();
    });
    done();
  });

  it('should give invalid Param if password is not given', (done) => {
    const request = {
      body: {
        payload: {
          email: 'v'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.InvalidParam.status);
      expect(response.message).to.be.equal(Response.InvalidParam.message);
      done();
    };
    UserController.authenticate(request, null, next);
  });

  it('should give invalid Param if email is not given', (done) => {
    const request = {
      body: {
        payload: {
          password: 'v'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.InvalidParam.status);
      expect(response.message).to.be.equal(Response.InvalidParam.message);
      done();
    };
    UserController.authenticate(request, null, next);
  });

  it('should give unauthorized if user is not registered', (done) => {
    const request = {
      body: {
        payload: {
          password: 'v',
          email: 'vivek.singh@s.com'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.UnAuthorized.status);
      expect(response.message).to.be.equal(Response.UnAuthorized.message);
      done();
    };
    UserController.authenticate(request, null, next);
  });

  it('should give unauthorized if user password does not match', (done) => {
    const request = {
      body: {
        payload: {
          password: 'v11111',
          email: 'viveksingh101994@gmail.com'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.UnAuthorized.status);
      expect(response.message).to.be.equal(Response.UnAuthorized.message);
      done();
    };
    UserController.authenticate(request, null, next);
  });

  it('should give unauthorized if user password matches', (done) => {
    const request = {
      body: {
        payload: {
          password: 'a12345',
          email: 'viveksingh101994@gmail.com'
        }
      }
    };
    const res = {
      cookie: (args) => {}
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.Success.status);
      expect(response.message.email).to.be.equal('viveksingh101994@gmail.com');
      done();
    };
    UserController.authenticate(request, res, next);
  });

  it('should give Server exception is thrown', (done) => {
    const request = {
      body: {
        payload: {
          password: 'a12345',
          email: 'exception'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.ServerError.status);
      expect(response.message.message).to.be.equal(
        Response.ServerError.message.message
      );
      done();
    };
    UserController.authenticate(request, null, next);
  });
});

describe('User Controller=> Register', () => {
  let stubArr = [];
  beforeEach((done) => {
    stubArr.push(
      sinon.stub(UserQueries, 'getUserByEmail').callsFake(getUserByEmailMock)
    );
    stubArr.push(
      sinon.stub(UserQueries, 'updateLastLogin').callsFake(() => {
        return Promise.resolve({});
      })
    );
    stubArr.push(
      sinon.stub(UserQueries, 'addUser').callsFake(() => {
        return Promise.resolve({});
      })
    );
    stubArr.push(
      sinon.stub(FireBase, 'uploadPicture').callsFake((param) => {
        return Promise.resolve('avatar');
      })
    );
    done();
  });
  afterEach((done) => {
    stubArr.forEach((stub) => {
      stub.restore();
    });
    done();
  });

  it('should give invalid Param if any of the parameter is missing', (done) => {
    const request = {
      body: {
        payload: {
          email: 'v'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.InvalidParam.status);
      expect(response.message).to.be.equal(Response.InvalidParam.message);
      done();
    };
    UserController.register(request, null, next);
  });

  it('should give user already exist if email is already registered', (done) => {
    const request = {
      body: {
        payload: {
          password: 'v',
          email: 'viveksingh101994@gmail.com',
          displayName: 's'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.UserAlreadyExist.status);
      expect(response.message.message).to.be.equal(
        Response.UserAlreadyExist.message.message
      );
      done();
    };
    UserController.register(request, null, next);
  });

  it('should register user if email is not registered and avatarUrl is not there', (done) => {
    const request = {
      body: {
        payload: {
          password: 'v',
          email: '12345@gmail.com',
          displayName: 's'
        }
      }
    };
    const res = {
      cookie: (args) => {}
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.Success.status);
      expect(response.message.email).to.be.equal('12345@gmail.com');
      done();
    };
    UserController.register(request, res, next);
  });

  it('should register user if email is not registered and avatarUrl is there', (done) => {
    const request = {
      body: {
        payload: {
          password: 'v',
          email: '12345@gmail.com',
          displayName: 's',
          avatarUrl: 'data:image/png;base64,iV'
        }
      }
    };
    const res = {
      cookie: (args) => {}
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.Success.status);
      expect(response.message.avatarUrl).to.be.equal('avatar');
      done();
    };
    UserController.register(request, res, next);
  });

  it('should give Server exception is thrown', (done) => {
    const request = {
      body: {
        payload: {
          password: 'a12345',
          email: 'exception@a.com',
          displayName: 's'
        }
      }
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.ServerError.status);
      expect(response.message.message).to.be.equal(
        Response.ServerError.message.message
      );
      done();
    };
    UserController.register(request, null, next);
  });
});

describe('User Controller=> Logout', () => {
  it('should logout user and give success', () => {
    const res = {
      clearCookie: () => {}
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.Success.status);
    };
    UserController.logOut(null, res, next);
  });
});
