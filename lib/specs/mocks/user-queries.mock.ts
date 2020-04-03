import { userModel } from '../../src/user/model/user-model';

export const getUserByEmailMock = (email) => {
  if (email === 'exception' || email === 'exception@a.com') {
    return Promise.reject(new Error('exception'));
  }
  if (email === 'viveksingh101994@gmail.com') {
    return Promise.resolve({
      get: (item) => {
        if (item === 'hash') {
          return '9547506a884f3d55312f6a8536cb122db5402c940ff679439ae7f15431ef3ea4f5d5fe2de404cf8ef29d00046887e342481b6e0504df5b8b10e2875546ac26d2';
        }
        if (item === 'salt') {
          return '2815737c3fd2d911b6a3a29b00ad0771';
        }
        if (item === 'email') {
          return 'viveksingh101994@gmail.com';
        }
        if (item === 'displayName') {
          return 'abcd';
        }
        if (item === 'avatarUrl') {
          return 'abcd.com';
        }
        if (item === 'uid') {
          return '1234567';
        }
      }
    });
  } else {
    return Promise.resolve(null);
  }
};

export const getUsersByUidMock = (users) => {
  if (users.some((x) => x === '1235')) {
    return Promise.resolve({});
  } else if (users.some((x) => x === '122')) {
    return Promise.reject(new Error('exception'));
  } else {
    return Promise.resolve([
      {
        get: (item) => {
          return 'iiiii';
        }
      }
    ]);
  }
};

export const getUsersVisitedMock = () => {
  return Promise.resolve([
    {
      get: (item) => {
        return 'iiiii';
      }
    }
  ]);
};
