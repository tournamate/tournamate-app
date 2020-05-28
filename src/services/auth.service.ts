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
          createdAt: new Date().toISOString(),
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

  static siginWithFacebook = async (payload: {
    accessToken: string;
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
    const facebookCredential = auth.FacebookAuthProvider.credential(
      payload.accessToken,
    );
    try {
      const authData = await auth().signInWithCredential(facebookCredential);
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
