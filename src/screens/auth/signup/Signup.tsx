import React, {useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  Text,
} from '@ui-kitten/components';

import {
  PersonLineIcon,
  EmailLineIcon,
  FacebookIcon,
  GoogleIcon,
} from '../../../components/icons.component';
import {KeyboardAvoidingView} from '../../../components/kb-avoiding-view.component';
import {RouterConstants} from '../../../constants/router.constants';
import TMView from '../../../components/view.component';

export default ({navigation}): React.ReactElement => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [userName, setUserName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = (): void => {
    navigation?.navigate(RouterConstants.Signin);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Hello, Sign up here</Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          autoCapitalize="none"
          placeholder="User Name"
          accessoryRight={PersonLineIcon}
          value={userName}
          onChangeText={setUserName}
        />
        <Input
          style={styles.emailInput}
          autoCapitalize="none"
          placeholder="Email"
          accessoryRight={EmailLineIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          autoCapitalize="none"
          secureTextEntry={!secureTextEntry}
          placeholder="Password"
          accessoryRight={renderIcon}
          value={password}
          onChangeText={setPassword}
        />
        <CheckBox
          style={styles.termsCheckBox}
          checked={termsAccepted}
          onChange={(checked: boolean) => setTermsAccepted(checked)}>
          I read and agree to Terms & Conditions
        </CheckBox>
      </Layout>
      <Button
        style={styles.signUpButton}
        size="giant"
        onPress={onSignUpButtonPress}>
        Sign up
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
        style={styles.signInButton}
        appearance="ghost"
        status="basic"
        onPress={onSignInButtonPress}>
        Already have an account? Sign In
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
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-hint-color',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  googleBtn: {
    marginRight: 30,
  },
});
