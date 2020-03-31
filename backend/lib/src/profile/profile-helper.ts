import { DBConnector } from '../db';
import * as firebase from 'firebase/app';
import { updateUserProfile } from '../user/user-helper';

export const updatePageVisit = async (user, additionalData) => {
  return updateUserProfile(user, additionalData);
};
export const getUsers = async (users) => {
  const userRef = DBConnector.firestore
    .collection('users')
    .where(firebase.firestore.FieldPath.documentId(), 'in', users);
  const usersSnapshot = await userRef.get();
  const otherUsers = [];
  if (usersSnapshot && usersSnapshot.docs)
    for (let snapshot of usersSnapshot.docs) {
      otherUsers.push({
        uid: snapshot.id,
        ...snapshot.data()
      });
    }
  return otherUsers;
};

export const getvisitedUsers = async (): Promise<any[]> => {
  const userRef = DBConnector.firestore
    .collection('users')
    .where('isDashboardVisited', '==', true);
  const usersSnapshot = await userRef.get();
  const userList = [];
  if (usersSnapshot && usersSnapshot.docs)
    for (let snapshot of usersSnapshot.docs) {
      userList.push({
        ...snapshot.data()
      });
    }
  return userList;
};
