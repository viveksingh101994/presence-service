import { userModel } from './model/user-model';

export class UserQueries {
  static addUser = async (user): Promise<any> => {
    const userData = new userModel(user);
    await userData.save();
  };

  static getUserByEmail = async (email: string): Promise<any> => {
    return userModel.findOne({ email });
  };

  static updateLastLogin = async (user: any): Promise<any> => {
    user.lastLogin = new Date().toString();
    user.isDashboardVisited = true;
    return user.save();
  };

  static updateIsConnected = async (
    user: any,
    isConnected: boolean
  ): Promise<any> => {
    return userModel.findOneAndUpdate(
      { uid: user.uid },
      {
        $set: {
          isConnected: isConnected
        }
      }
    );
  };

  static getUsersByUid = async (users): Promise<any> => {
    return userModel.find({ uid: { $in: users } });
  };

  static getUsersVisited = async (): Promise<any> => {
    return userModel.find({ isDashboardVisited: true });
  };

  static getActiveUsers = async (): Promise<any> => {
    return userModel.find({ isConnected: true });
  };
}
