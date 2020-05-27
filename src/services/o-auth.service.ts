import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';

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

  static async getGoogleOAuthCodes() {
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    let data = {};
    try {
      data = await GoogleSignin.signIn();
    } catch (error) {
      console.log(error);
    }
    return data;
  }
}

export default OAuthService;
