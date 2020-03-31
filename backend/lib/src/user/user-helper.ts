import { DBConnector, FireBase } from '../db';
import { Profile } from '../profile/models/profile-model';
import { getImgTypeAndString } from '../common';
const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = DBConnector.firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date().toString();
    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  } else {
    try {
      await userRef.update({
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
};

export const registerUser = async (userData: Profile) => {
  let { email, password, displayName, avatarUrl = null } = userData;
  if (avatarUrl) {
    avatarUrl = await FireBase.uploadPicture(getImgTypeAndString(avatarUrl));
  }
  const { user } = await DBConnector.auth.createUserWithEmailAndPassword(
    email,
    password
  );
  return createUserProfileDocument(user, { displayName, avatarUrl });
};

export const authenticateUser = async ({ email, password }) => {
  const userData = await DBConnector.auth.signInWithEmailAndPassword(
    email,
    password
  );
  return createUserProfileDocument(userData.user, {
    lastLogin: new Date().toString()
  });
};

export const updateUserProfile = async (user, additionalData) => {
  return createUserProfileDocument(user, additionalData);
};
