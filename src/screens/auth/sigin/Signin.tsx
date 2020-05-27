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
import {Formik} from 'formik';
import * as Yup from 'yup';

import {KeyboardAvoidingView} from '../../../components/kb-avoiding-view.component';
import TMView from '../../../components/view.component';
import {
  FacebookIcon,
  GoogleIcon,
  CaptionIcon,
  EmailLineIcon,
} from '../../../components/icons.component';
import {RouterConstants} from '../../../constants/router.constants';
import OAuthService from '../../../services/o-auth.service';
import ScreenLoader from '../../../components/screen-loader.component';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Password is Required'),
});

export default ({navigation}: any): React.ReactElement => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate(RouterConstants.Signup);
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate(RouterConstants.ForgotPassword);
  };

  const handleFacebookSignin = async () => {
    setIsLoading(true);

    // const fbAccesToken = await OAuthService.getFBAccessToken();
    setIsLoading(false);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={toggleSecureEntry}
      style={styles.rightIcon}>
      <Icon {...props} name={secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const fields = [
    {
      fieldName: 'email',
      placeholder: 'Email',
      captionIcon: CaptionIcon,
      keyboardType: 'email-address',
      accessoryRight: EmailLineIcon,
    },
    {
      fieldName: 'password',
      placeholder: 'Password',
      captionIcon: CaptionIcon,
      secureTextEntry: secureTextEntry,
      accessoryRight: renderIcon,
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.container}>
      {isLoading ? <ScreenLoader loading={isLoading} /> : null}
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          Hello
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Sign in to your account
        </Text>
      </View>
      <Formik
        initialValues={{email: '', password: '', isAccepetedTerms: false}}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          console.log(values);
          // props.signinUser(values);
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}: any) => (
          <>
            <Layout style={styles.formContainer} level="1">
              {fields.map((field) => (
                <Input
                  key={field.fieldName}
                  placeholder={field.placeholder}
                  value={values[field.fieldName]}
                  caption={errors[field.fieldName]}
                  onChangeText={handleChange(field.fieldName)}
                  onBlur={handleBlur(field.fieldName)}
                  captionIcon={
                    errors[field.fieldName] ? field.captionIcon : undefined
                  }
                  accessoryRight={field.accessoryRight}
                  status={errors[field.fieldName] ? 'danger' : ''}
                  secureTextEntry={field.secureTextEntry}
                />
              ))}
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
            <Button
              style={styles.signInButton}
              size="giant"
              onPress={handleSubmit}>
              Sign in
            </Button>
          </>
        )}
      </Formik>
      <TMView flexDirection="row" width="100%" justifyContent="center">
        <Button
          size="large"
          appearance="ghost"
          accessoryLeft={FacebookIcon}
          style={styles.googleBtn}
        />
        <Button
          size="large"
          appearance="ghost"
          accessoryLeft={GoogleIcon}
          onPress={handleFacebookSignin}
        />
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
