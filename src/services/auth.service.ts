import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {SignupWithEmail, UserDataType} from './../models/user.models';
import User from './user.service';
import AsyncStorage from '@react-native-community/async-storage';
import {AppStorage} from './app-storage.service';
import {AppReloadService} from './app-reload.service';

interface SignupEmailReturnType {
  errors?: {
    isUserNameExists?: boolean;
    isEmailExists?: boolean;
  };
  userDetails?: UserDataType;
}

interface SignEmailReturnType {
  userInfo?: UserDataType | {};
  errors?: {
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
      if (!isUserNameExists) {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const {
          user: {uid: userId},
        } = userCredential;
        const userDetails = {
          signedInWithEmail: true,
          fullName,
          userName,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          email,
          userId,
        };
        await User.set(userId, userDetails);
        result = {...result, userDetails: {...userDetails}};
      } else {
        result = {...result, errors: {isUserNameExists: true}};
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        result = {...result, errors: {isEmailExists: true}};
      }
    }
    return result;
  };

  static signinWithEmail = async (payload: {
    email: string;
    password: string;
  }): Promise<SignEmailReturnType> => {
    let result = {};
    try {
      const {
        user: {uid: userId},
      } = await auth().signInWithEmailAndPassword(
        payload.email,
        payload.password,
      );
      const userInfo = await User.get(userId);
      result = {...result, userDetails: {...userInfo}};
    } catch (error) {
      const errors = {
        wrongPassword: false,
        notFound: false,
        tooManyAttempts: false,
      };
      if (error.code === 'auth/wrong-password') {
        errors.wrongPassword = true;
      } else if (error.code === 'auth/user-not-found') {
        errors.notFound = true;
      } else if (error.code === 'auth/unknown') {
        errors.tooManyAttempts = true;
      }
    }
    return result;
  };

  static signInWithGoogle = async (payload: {
    idToken: string;
  }): Promise<
    | {
        data: object;
        isNewUser: boolean | undefined;
      }
    | {errors: object}
    | undefined
  > => {
    const googleCredential = auth.GoogleAuthProvider.credential(
      payload.idToken,
    );
    try {
      const authData = await auth().signInWithCredential(googleCredential);
      const {user, additionalUserInfo} = authData;
      const userDetails: any = {
        fullName: user.displayName,
        email: user.email,
        userId: user.uid,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        photo: user.photoURL,
        mobileNumber: user.phoneNumber,
        emailIdVerified: user.emailVerified,
        mobileNumberVerified: false,
        others: {
          aud: additionalUserInfo?.profile?.aud,
          provider: user.providerId,
          iss: additionalUserInfo?.profile?.iss,
        },
      };
      if (additionalUserInfo?.isNewUser) {
        userDetails.createdAt = firebase.firestore.Timestamp.fromDate(
          new Date(),
        );
      }
      const userInfo: any = await User.set(authData.user.uid, userDetails);
      userInfo.isNewUser = additionalUserInfo?.isNewUser ? true : false;
      return userInfo;
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        return {
          errors: {
            accountExists:
              'An account already exists with the same email address but different sign-in credentials.',
          },
        };
      }
    }
  };

  static siginWithFacebook = async (payload: {
    accessToken: string;
  }): Promise<
    | {
        data: object;
        isNewUser: boolean | undefined;
      }
    | {errors: object}
    | undefined
  > => {
    const facebookCredential = auth.FacebookAuthProvider.credential(
      payload.accessToken,
    );
    try {
      const authData = await auth().signInWithCredential(facebookCredential);
      const {user, additionalUserInfo} = authData;
      const userDetails: any = {
        fullName: user.displayName,
        email: user.email,
        userId: user.uid,
        photo: user.photoURL,

        mobileNumber: user.phoneNumber,
        emailIdVerified: user.emailVerified,
        mobileNumberVerified: false,
        others: {
          aud: additionalUserInfo?.profile?.aud,
          provider: user.providerId,
          iss: additionalUserInfo?.profile?.iss,
        },
      };
      if (additionalUserInfo?.isNewUser) {
        userDetails.createdAt = firebase.firestore.Timestamp.fromDate(
          new Date(),
        );
      }
      console.log(authData, 'auth data');
      const userInfo: any = await User.set(authData.user.uid, userDetails);
      userInfo.isNewUser = additionalUserInfo?.isNewUser ? true : false;
      return userInfo;
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        return {
          errors: {
            accountExists:
              'An account already exists with the same email address but different sign-in credentials.',
          },
        };
      }
    }
  };

  static async signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    await AppStorage.clearAll();
    AppReloadService.reload();
  }
}

export default AuthService;
