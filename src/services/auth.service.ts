import {SignupWithEmail, UserDataType} from './../models/user.models';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import User from './user.service';

interface SignupEmailReturnType {
  token: null | string;
  userExists: boolean | null;
  userId: string | null;
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
    const {fullName, nickName, email, password} = payload;
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const {
        user: {uid: userId, getIdToken},
      } = userCredential;
      const token = await getIdToken();
      const userDetails = {
        signedInWithEmail: true,
        fullName,
        nickName,
        email,
        userId,
      };
      const data = await User.set(userId, userDetails);
      console.log(data);
      return {token, userExists: false, userId};
    } catch (error) {
      console.log('Sign up using email and password', error);
      if (error.code === 'auth/email-already-in-use') {
        return {token: null, userExists: true, userId: null};
      }
    }
    return {token: null, userExists: null, userId: null};
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
        user: {uid: userId, getIdToken},
      } = await auth().signInWithEmailAndPassword(
        payload.email,
        payload.password,
      );
      const token = await getIdToken();
      const userInfo = await User.get(userId);
      userInfo.token = token;
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
}

export default AuthService;
