import {UserDataType} from './../models/user.models';
import firestore from '@react-native-firebase/firestore';

class User {
  static collectionName = 'users';

  static async get(userId: string): Promise<UserDataType> {
    try {
      const user = await firestore()
        .collection(User.collectionName)
        .doc(userId)
        .get();
      if (user.exists) {
        const userInfo: any = user.data();
        return {
          nickName: userInfo.nickName,
          fullName: userInfo.fullName,
          email: userInfo.email,
          signedInWithEmail: userInfo.signedInWithEmail,
          isUserExists: true,
        };
      } else {
        return {
          nickName: '',
          fullName: '',
          email: '',
          signedInWithEmail: false,
          isUserExists: false,
        };
      }
    } catch (error) {
      console.log(error);
    }
    return {
      nickName: '',
      fullName: '',
      email: '',
      signedInWithEmail: false,
      isUserExists: false,
    };
  }

  static async set(userId: string, userDetails: object): Promise<void> {
    try {
      const isAdded = await firestore()
        .collection(User.collectionName)
        .doc(userId)
        .set(userDetails);
      return isAdded;
    } catch (error) {}
  }
}

export default User;
