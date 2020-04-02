import { userModel } from './model/user-model';

export const addUser = async (user) => {
  const userData = new userModel(user);
  await userData.save();
};

export const getUserByEmail = async (email: string) => {
  return userModel.findOne({ email });
};

export const updateLastLogin = async (user: any) => {
  user.lastLogin = new Date().toString();
  user.isDashboardVisited = true;
  return user.save();
};

export const getUsersByUid = async (users) => {
  return userModel.find({ uid: { $in: users } });
};

export const getUsersVisited = async () => {
  return userModel.find({ isDashboardVisited: true });
};
