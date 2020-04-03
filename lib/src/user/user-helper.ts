import { IProfile } from '../profile/models/profile-model';
import { UserQueries } from './user-queries';
import { setPassword, validPassword } from './model/user-model';

process.env.SECRET = 'vvvvv';
export const registerUser = async (userData: IProfile) => {
  let { email, password, displayName, uid, avatarUrl = null } = userData;
  return UserHelper.register({
    email,
    password,
    displayName,
    avatarUrl,
    uid
  });
};

export const authenticateUser = async ({ email, password }) => {
  const user = await UserQueries.getUserByEmail(email);
  if (user && validPassword(password, user.get('hash'), user.get('salt'))) {
    await UserQueries.updateLastLogin(user);
    return {
      email: user.get('email'),
      displayName: user.get('displayName'),
      avatarUrl: user.get('avatarUrl'),
      uid: user.get('uid')
    };
  } else {
    return null;
  }
};

export class UserHelper {
  static async register(user: any): Promise<boolean> {
    if (await UserHelper.checkIfUserAlreadyExist(user)) {
      return false;
    } else {
      const passwordObj = setPassword(user.password);
      user.salt = passwordObj.salt;
      user.hash = passwordObj.hash;
      user.lastLogin = new Date().toString();
      user.isDashboardVisited = true;
      await UserQueries.addUser(user);
      return true;
    }
  }
  static async checkIfUserAlreadyExist(user): Promise<boolean> {
    const userFromDB = await UserQueries.getUserByEmail(user.email);
    if (userFromDB) {
      return true;
    } else {
      return false;
    }
  }
}
