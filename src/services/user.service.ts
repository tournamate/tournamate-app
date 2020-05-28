import {UserDataType} from './../models/user.models';
import firestore from '@react-native-firebase/firestore';

class User {
  static collectionName = 'users';

  static async get(
    userId: string,
  ): Promise<UserDataType | {notExists: boolean}> {
    try {
      const user = await firestore()
        .collection(User.collectionName)
        .doc(userId)
        .get();
      if (user.exists) {
        const userInfo: any = user.data();
        return {
          email: <string>userInfo.email,
          userId: <string>userInfo.userId,
          fullName: <string>userInfo.fullName,
          signedInWithEmail: <boolean>userInfo.signedInWithEmail,
          createdAt: <string>userInfo.createdAt,
          userName: <string>userInfo.userName,
        };
      } else {
        return {
          notExists: true,
        };
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async set(userId: string, userDetails: object): Promise<void> {
    try {
      const isAdded = await firestore()
        .collection(User.collectionName)
        .doc(userId)
        .set(userDetails);
      return isAdded;
    } catch (error) {
      console.log(error);
    }
  }

  static async isUserNameExists(userName: string): Promise<boolean> {
    console.log(userName, 'username');
    try {
      const document = await firestore()
        .collection(User.collectionName)
        .where('userName', '==', userName)
        .get();
      if (document.size) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}

export default User;
