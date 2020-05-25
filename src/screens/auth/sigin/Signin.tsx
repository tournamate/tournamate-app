import React, {useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';

import {KeyboardAvoidingView} from '../../../components/kb-avoiding-view.component';
import TMView from '../../../components/view.component';
import {
  FacebookIcon,
  GoogleIcon,
  CaptionIcon,
  EmailLineIcon,
} from '../../../components/icons.component';
import {RouterConstants} from '../../../constants/router.constants';

export default ({navigation}: any): React.ReactElement => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate(RouterConstants.Signup);
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate(RouterConstants.ForgotPassword);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={toggleSecureEntry}
      style={styles.rightIcon}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          Hello
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Sign in to your account
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Email"
          value={email}
          caption="Enter a valid email"
          onChangeText={setEmail}
          captionIcon={CaptionIcon}
          accessoryRight={EmailLineIcon}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          caption="Enter a valid email"
          captionIcon={CaptionIcon}
          secureTextEntry={!secureTextEntry}
          onChangeText={setPassword}
          accessoryRight={renderIcon}
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
            onPress={onForgotPasswordButtonPress}>
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Button style={styles.signInButton} size="giant">
        Sign in
      </Button>
      <TMView flexDirection="row" width="100%" justifyContent="center">
        <Button
          size="large"
          appearance="ghost"
          accessoryLeft={FacebookIcon}
          style={styles.googleBtn}
        />
        <Button size="large" appearance="ghost" accessoryLeft={GoogleIcon} />
      </TMView>

      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={onSignUpButtonPress}>
        Don't have an account? Create
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  googleBtn: {
    marginRight: 30,
  },
  rightIcon: {padding: 20},
});
