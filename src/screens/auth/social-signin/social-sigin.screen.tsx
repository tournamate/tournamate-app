import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Button, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {connect} from 'react-redux';

import {KeyboardAvoidingView} from '../../../components/kb-avoiding-view.component';
import {FacebookIcon, GoogleIcon} from '../../../components/icons.component';
import ScreenLoader from '../../../components/screen-loader.component';
import normalize from '../../../shared/methods/normalize';
import OAuthService from '../../../services/o-auth.service';
import AuthService from '../../../services/auth.service';
import {signupUser} from '../../../store/actions/authActions';

const SocialSignin = ({signupUserState}: any): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const styles = useStyleSheet(themedStyles);
  const handleSigninWithFacebook = async () => {
    setIsLoading(true);
    const accessData = await OAuthService.getFBAccessToken();
    if (accessData.accessToken) {
      try {
        const result: any = await AuthService.siginWithFacebook({
          accessToken: accessData.accessToken,
        });
        if (result?.errors?.accountExists) {
          setErrorText(result?.errors.accountExists);
        } else if (result?.exists) {
          setIsLoading(false);
          setErrorText('');
          signupUserState({
            ...result.data,
            isNewUser: result.isNewUser,
            createdAt: result?.data?.createdAt?.toDate()?.getTime(),
          });
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  const handleSigninWithGoogle = async () => {
    setIsLoading(true);
    const {idToken} = await OAuthService.getGoogleOAuthCodes();
    if (idToken && typeof idToken === 'string') {
      try {
        const result: any = await AuthService.signInWithGoogle({
          idToken: idToken,
        });
        if (result.errors?.accountExists) {
          setErrorText(result.errors.accountExists);
        } else if (result.exists) {
          setIsLoading(false);
          signupUserState({
            ...result.data,
            isNewUser: result.isNewUser,
            createdAt: result?.data?.createdAt?.toDate()?.getTime(),
          });
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      {isLoading ? <ScreenLoader loading={isLoading} /> : null}
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <Text category="h1" status="control" style={styles.headText}>
            Welcome to TournaMate,
          </Text>
          <Text style={styles.signInLabel} category="p1" status="control">
            One step to start earning money
          </Text>
        </View>
        <Text status="danger" style={styles.signInButton}>
          {errorText}
        </Text>
        <View>
          <Button
            style={styles.signInButton}
            size="giant"
            onPress={handleSigninWithFacebook}
            accessoryLeft={FacebookIcon}>
            Signin with facebook
          </Button>
          <Button
            style={styles.signInButton}
            size="giant"
            onPress={handleSigninWithGoogle}
            accessoryLeft={GoogleIcon}>
            Signin with google
          </Button>
          <TouchableOpacity activeOpacity={0.5} style={styles.signInButton}>
            <Text appearance="hint" style={styles.termsText}>
              *You're signing in by accepting our terms & conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headText: {textAlign: 'center'},
  subContainer: {flex: 1, justifyContent: 'space-between'},
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: normalize(300, 'height'),
    backgroundColor: 'color-primary-default',
  },
  termsText: {marginHorizontal: 20, textAlign: 'center'},

  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
});

const mapStateToProps = (state: any) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  signupUserState: signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialSignin);
