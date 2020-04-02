import { FireBase } from '../db';
import { IProfile } from '../profile/models/profile-model';
import { getImgTypeAndString } from '../common';
import { addUser, getUserByEmail, updateLastLogin } from './user-queries';
import { userModel, setPassword, validPassword } from './model/user-model';
export const registerUser = async (userData: IProfile) => {
  let { email, password, displayName, uid, avatarUrl = null } = userData;
  if (avatarUrl) {
    avatarUrl = await FireBase.uploadPicture(getImgTypeAndString(avatarUrl));
  }
  return UserHelper.register({
    email,
    password,
    displayName,
    avatarUrl,
    uid
  });
};

export const authenticateUser = async ({ email, password }) => {
  const user = await getUserByEmail(email);
  if (user && validPassword(password, user.get('hash'), user.get('salt'))) {
    await updateLastLogin(user);
    return {
      email: user.get('email'),
      displayName: user.get('displayName'),
      avatarUrl: user.get('avatarUrl') ? user.get('avatarUrl') : '',
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
      await addUser(user);
      return true;
    }
  }
  static async checkIfUserAlreadyExist(user): Promise<boolean> {
    const userFromDB = await getUserByEmail(user.email);
    if (userFromDB) {
      return true;
    } else {
      return false;
    }
  }
}
