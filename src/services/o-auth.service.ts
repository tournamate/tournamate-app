import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin, User} from '@react-native-community/google-signin';

interface FBResultType {
  accessToken: string;
  isCancelled: string;
}

abstract class OAuthType {
  static getFBAccessToken: () => Promise<FBResultType>;
  static getGoogleOAuthCodes: {};
}

class OAuthService implements OAuthType {
  static async getFBAccessToken() {
    const fbResult = {
      accessToken: '',
      isCancelled: false,
    };
    LoginManager.logOut();
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async (result) => {
          if (result.isCancelled) {
            fbResult.isCancelled = true;
            return false;
          }
          const data: AccessToken | null = await AccessToken.getCurrentAccessToken();
          fbResult.accessToken = data?.accessToken || '';
          return data;
        },
      );
    } catch (error) {
      console.log(error);
    }
    return {
      accessToken: fbResult.accessToken,
      isCancelled: fbResult.isCancelled,
    };
  }

  static async getGoogleOAuthCodes(): Promise<User> {
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    try {
      let data = await GoogleSignin.signIn();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default OAuthService;
