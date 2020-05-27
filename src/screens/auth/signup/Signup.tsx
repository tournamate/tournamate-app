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
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  PersonLineIcon,
  EmailLineIcon,
  FacebookIcon,
  GoogleIcon,
  CaptionIcon,
} from '../../../components/icons.component';
import {KeyboardAvoidingView} from '../../../components/kb-avoiding-view.component';
import {RouterConstants} from '../../../constants/router.constants';
import TMView from '../../../components/view.component';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too short!')
    .max(30, 'Too long!')
    .required('Full is required'),
  userName: Yup.string().max(15, 'Too long!').required(),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Password is Required'),
  isAccepetedTerms: Yup.boolean().equals([true]),
});

export default ({navigation}): React.ReactElement => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const styles = useStyleSheet(themedStyles);

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

  const fields = [
    {
      fieldName: 'fullName',
      placeholder: 'Full name',
      captionIcon: CaptionIcon,
      autoCompleteType: 'name',
      autoCapitalize: 'words',
      accessoryRight: PersonLineIcon,
    },
    {
      fieldName: 'userName',
      placeholder: 'User name',
      captionIcon: CaptionIcon,
      autoCompleteType: 'name',
      autoCapitalize: 'words',
      accessoryRight: PersonLineIcon,
    },
    {
      fieldName: 'email',
      placeholder: 'Email',
      captionIcon: CaptionIcon,
      autoCompleteType: 'email',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      accessoryRight: EmailLineIcon,
    },
    {
      fieldName: 'password',
      placeholder: 'Password',
      autoCapitalize: 'none',
      captionIcon: CaptionIcon,
      autoCompleteType: 'password',
      secureTextEntry: secureTextEntry,
      accessoryRight: renderIcon,
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Hello, Sign up here</Text>
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
          fullName: '',
          userName: '',
          isAccepetedTerms: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }: any) => (
          <>
            <Layout style={styles.formContainer} level="1">
              {fields.map((field, index) => (
                <Input
                  key={field.fieldName}
                  autoCapitalize={field.autoCapitalize as any}
                  placeholder={field.placeholder}
                  accessoryRight={field.accessoryRight}
                  value={values[field.fieldName]}
                  onChangeText={handleChange(field.fieldName)}
                  onBlur={handleBlur(field.fieldName)}
                  autoCompleteType={field.autoCompleteType as any}
                  style={index === fields.length ? null : styles.input}
                  captionIcon={
                    errors[field.fieldName] ? field.captionIcon : undefined
                  }
                  status={errors[field.fieldName] ? 'danger' : ''}
                  caption={errors[field.fieldName]}
                />
              ))}

              <CheckBox
                style={styles.termsCheckBox}
                status="danger"
                checked={values.isAccepetedTerms}
                onChange={(checked: boolean) =>
                  setFieldValue('isAccepetedTerms', checked)
                }>
                {() => (
                  <Text status="danger" style={styles.agreement}>
                    I read and agree to Terms & Conditions
                  </Text>
                )}
              </CheckBox>
            </Layout>
            <Button
              style={styles.signUpButton}
              size="giant"
              onPress={handleSubmit}>
              Sign up
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
  input: {
    marginBottom: 16,
  },

  termsCheckBox: {
    marginTop: 15,
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
  agreement: {
    marginLeft: 10,
  },
});
