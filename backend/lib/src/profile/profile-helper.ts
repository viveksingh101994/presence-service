import { DBConnector } from '../db';
import * as firebase from 'firebase/app';

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
