import { ProfileController } from '../../../src/profile/profile-controller';
import { Response } from '../../../src/common';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { UserQueries } from '../../../src/user/user-queries';
import {
  getUsersByUidMock,
  getUsersVisitedMock
} from '../../mocks/user-queries.mock';

describe('Profile Controller=>user', () => {
  it('should return success Response', () => {
    const req = {
      user: 'vivek'
    };
    const next = (response) => {
      expect(response.status).to.be.equal(Response.Success.status);
    };
    ProfileController.user(req, null, next);
  });
});

// describe('Profile Controller=>room', () => {
//   let stubArr = [];
//   before((done) => {
//     stubArr.push(
//       sinon.stub(UserQueries, 'getUsersByUid').callsFake(getUsersByUidMock)
//     );
//     done();
//   });
//   it('should return invalid param Response if payload is not there', (done) => {
//     const req = {
//       body: {}
//     };
//     const next = (response) => {
//       expect(response.status).to.be.equal(Response.InvalidParam.status);
//       expect(response.message.message).to.be.equal(
//         Response.InvalidParam.message.message
//       );
//       done();
//     };
//     ProfileController.room(req, null, next);
//   });

//   it('should return zero users if invalid payload is there', (done) => {
//     const req = {
//       body: {
//         payload: ['1235']
//       }
//     };
//     const next = (response) => {
//       expect(response.status).to.be.equal(Response.Success.status);
//       expect(response.message).to.be.instanceOf(Array);
//       expect(response.message.length).to.be.equal(0);
//       done();
//     };
//     ProfileController.room(req, null, next);
//   });

//   it('should return zero users if valid payload is there', (done) => {
//     const req = {
//       body: {
//         payload: ['1234']
//       }
//     };
//     const next = (response) => {
//       expect(response.status).to.be.equal(Response.Success.status);
//       expect(response.message).to.be.instanceOf(Array);
//       expect(response.message.length).to.be.equal(1);
//       done();
//     };
//     ProfileController.room(req, null, next);
//   });

//   it('should return zero users if valid payload is there', (done) => {
//     const req = {
//       body: {
//         payload: ['122']
//       }
//     };
//     const next = (response) => {
//       expect(response.status).to.be.equal(Response.ServerError.status);
//       expect(response.message.message).to.be.equal(
//         Response.ServerError.message.message
//       );
//       done();
//     };
//     ProfileController.room(req, null, next);
//   });

//   after((done) => {
//     stubArr.forEach((stub) => {
//       stub.restore();
//     });
//     done();
//   });
// });

describe('Profile Controller=>visitedUser', () => {
  it('should return visited users as zero if there is no users in response', (done) => {
    const req = {
      body: {}
    };
    const stubbedFunction = sinon
      .stub(UserQueries, 'getUsersVisited')
      .callsFake(() => Promise.resolve({}));

    const next = (response) => {
      expect(response.status).to.be.equal(Response.Success.status);
      expect(response.message).to.be.instanceOf(Array);
      expect(response.message.length).to.be.equal(0);
      stubbedFunction.restore();
      done();
    };
    ProfileController.visitedUser(req, null, next);
  });

  it('should return visited users as zero if there is are users in response', (done) => {
    const req = {
      body: {}
    };
    const stubbedFunction = sinon
      .stub(UserQueries, 'getUsersVisited')
      .callsFake(getUsersVisitedMock);

    const next = (response) => {
      expect(response.status).to.be.equal(Response.Success.status);
      expect(response.message).to.be.instanceOf(Array);
      expect(response.message.length).to.be.equal(1);
      stubbedFunction.restore();
      done();
    };
    ProfileController.visitedUser(req, null, next);
  });

  it('should return server error if there is exception', (done) => {
    const req = {
      body: {}
    };
    const stubbedFunction = sinon
      .stub(UserQueries, 'getUsersVisited')
      .callsFake(() => Promise.reject(new Error('exception')));

    const next = (response) => {
      expect(response.status).to.be.equal(Response.ServerError.status);
      expect(response.message.message).to.be.equal(
        Response.ServerError.message.message
      );
      stubbedFunction.restore();
      done();
    };
    ProfileController.visitedUser(req, null, next);
  });
});
