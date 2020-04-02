import {
  getUserByEmail,
  updateIsDashboardVisited,
  getUsersByUid,
  getUsersVisited
} from '../user/user-queries';

export const updatePageVisit = async ({ email }) => {
  const user = await getUserByEmail(email);
  return updateIsDashboardVisited(user);
};
export const getUsers = async (users) => {
  const userRef = await getUsersByUid(users);
  const otherUsers = [];
  if (Array.isArray(userRef))
    for (let user of userRef) {
      otherUsers.push({
        uid: user.get('uid'),
        email: user.get('email'),
        displayName: user.get('displayName'),
        avatarUrl: user.get('avatarUrl') ? user.get('avatarUrl') : '',
        lastLogin: user.get('lastLogin')
      });
    }
  return otherUsers;
};

export const getvisitedUsers = async (): Promise<any[]> => {
  const userRef = await getUsersVisited();
  const otherUsers = [];
  if (Array.isArray(userRef))
    for (let user of userRef) {
      otherUsers.push({
        uid: user.get('uid'),
        email: user.get('email'),
        displayName: user.get('displayName'),
        avatarUrl: user.get('avatarUrl') ? user.get('avatarUrl') : '',
        lastLogin: user.get('lastLogin')
      });
    }
  return otherUsers;
};
