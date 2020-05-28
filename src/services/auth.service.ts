import auth from '@react-native-firebase/auth';

import {SignupWithEmail, UserDataType} from './../models/user.models';
import User from './user.service';

interface SignupEmailReturnType {
  errors?: {
    isUserNameExists?: boolean;
    isEmailExists?: boolean;
  };
  userDetails?: UserDataType;
}

interface SignEmailReturnType {
  userInfo?: UserDataType | {};
  errors: {
    wrongPassword?: boolean;
    notFound?: boolean;
    tooManyAttempts?: boolean;
  };
}

class AuthService {
  static signUpWithEmail = async (
    payload: SignupWithEmail,
  ): Promise<SignupEmailReturnType> => {
    const {fullName, userName, email, password} = payload;
    let result = {};
    try {
      const isUserNameExists = await User.isUserNameExists(userName);
      console.log(isUserNameExists);
      if (!isUserNameExists) {
        console.log('inside');
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log(userCredential);
        const {
          user: {uid: userId},
        } = userCredential;
        const userDetails = {
          signedInWithEmail: true,
          fullName,
          userName,
          createdAt: new Date().toISOString(),
          email,
          userId,
        };
        await User.set(userId, userDetails);
        result = {userDetails: {...userDetails}};
      } else {
        result = {errors: {isUserNameExists: true}};
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        result = {errors: {isEmailExists: true}};
      }
    }
    return result;
  };

  static signinWithEmail = async (payload: {
    email: string;
    password: string;
  }): Promise<SignEmailReturnType> => {
    let result = {
      userInfo: {},
      errors: {
        wrongPassword: false,
        notFound: false,
        tooManyAttempts: false,
      },
    };
    try {
      const {
        user: {uid: userId},
      } = await auth().signInWithEmailAndPassword(
        payload.email,
        payload.password,
      );
      const userInfo = await User.get(userId);
      if (userInfo.isUserExists) {
        result.userInfo = userInfo;
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        result.errors.wrongPassword = true;
      } else if (error.code === 'auth/user-not-found') {
        result.errors.notFound = true;
      } else if (error.code === 'auth/unknown') {
        result.errors.tooManyAttempts = true;
      }
    }
    return result;
  };

  static signInWithGoogle = async (payload: {
    idToken: string;
    userName: string;
  }): Promise<{
    signedInWithEmail: boolean;
    fullName: string | null;
    userName: string;
    createdAt: string;
    email: string | null;
    userId: string;
    photo: string | null;
  }> => {
    const googleCredential = auth.GoogleAuthProvider.credential(
      payload.idToken,
    );
    try {
      const authData = await auth().signInWithCredential(googleCredential);
      const userDetails = {
        signedInWithEmail: false,
        fullName: authData.user.displayName,
        userName: payload.userName,
        createdAt: new Date().toISOString(),
        email: authData.user.email,
        userId: authData.user.uid,
        photo: authData.user.photoURL,
      };
      await User.set(authData.user.uid, userDetails);
      return userDetails;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  static signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
}

export default AuthService;
