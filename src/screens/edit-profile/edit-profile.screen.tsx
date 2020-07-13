import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Datepicker,
  InputProps,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import firebase from '@react-native-firebase/app';

import {
  PersonLineIcon,
  EmailLineIcon,
  CaptionIcon,
  CameraIcon,
  CalendarIcon,
  PhoneCallIcon,
  ArrowBackIcon,
} from '../../components/icons.component';
import {KeyboardAvoidingView} from '../../components/kb-avoiding-view.component';

import TMStatusBar from '../../components/status-bar.component';
import ScreenLoader from '../../components/screen-loader.component';
import {signupUser} from '../../store/actions/authActions';
import {AuthSchema} from '../../models/user.models';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import {ProfileAvatar} from '../../components/profile-avatar.component';
import {GlobalStyles} from '../../constants/global-styles';
import {widthPercentageToDP} from '../../shared/methods/normalize';
import User from '../../services/user.service';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .required('* required'),
  userName: Yup.string().max(15, 'Too long!').required('* required'),
  email: Yup.string().email('Invalid email').required('* required'),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('* required'),
  pubgUsername: Yup.string(),
  freeFireUsername: Yup.string(),
  dob: Yup.date().required('* required'),
});

interface Props extends HomeDrawerNavProps<'Dashboard'> {
  authData: AuthSchema;
  signupUserProp: () => void;
}

const EditProfile = ({navigation, authData, signupUserProp}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const styles = useStyleSheet(themedStyles);

  interface FieldProps extends InputProps {
    fieldName: string;
  }

  const fields: Array<FieldProps> = [
    {
      fieldName: 'fullName',
      placeholder: 'Ashok ravichandar',
      label: 'Full Name',
      captionIcon: CaptionIcon,
      autoCompleteType: 'name',
      autoCapitalize: 'words',
      accessoryRight: PersonLineIcon,
    },
    {
      fieldName: 'userName',
      placeholder: 'jackryder09',
      label: 'Username',
      captionIcon: CaptionIcon,
      autoCompleteType: 'name',
      autoCapitalize: 'words',
      accessoryRight: PersonLineIcon,
    },
    {
      fieldName: 'email',
      placeholder: 'Email',
      disabled: true,
      label: 'Email',
      captionIcon: CaptionIcon,
      autoCompleteType: 'email',
      keyboardType: 'email-address',
      caption: 'Email id cannot be edit',
      autoCapitalize: 'none',
      accessoryRight: EmailLineIcon,
    },
    {
      fieldName: 'mobileNumber',
      placeholder: '+91 9042696755',
      label: 'Mobile Number',
      captionIcon: CaptionIcon,
      autoCompleteType: 'tel',
      keyboardType: 'name-phone-pad',
      caption: 'This is required',
      autoCapitalize: 'none',
      accessoryRight: PhoneCallIcon,
    },
    {
      fieldName: 'pubgMobileUsername',
      label: 'PUBG M Username',
      placeholder: 'rocky098',
      captionIcon: CaptionIcon,
      autoCompleteType: 'username',
      keyboardType: 'default',
      caption: 'This is cannot change after submit',
      autoCapitalize: 'none',
    },
    {
      fieldName: 'freeFireUsername',
      label: 'Free Fire Username',
      placeholder: 'rockyfire09',
      captionIcon: CaptionIcon,
      autoCompleteType: 'username',
      keyboardType: 'default',
      caption: 'This is cannot change after submit',
      autoCapitalize: 'none',
    },
  ];

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryLeft={CameraIcon}
    />
  );
  const isScreenFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
          {isScreenFocused && (
            <TMStatusBar translucent backgroundColor="transparent" />
          )}
          {isLoading ? <ScreenLoader loading={isLoading} /> : null}
          <View style={[styles.headerContainer, {paddingTop: insets.top}]}>
            <Button
              accessoryLeft={ArrowBackIcon}
              size="large"
              style={[styles.backIcon, {top: insets.top}]}
              onPress={() => navigation.goBack()}
            />
            <ProfileAvatar
              source={{
                uri: authData.photo,
              }}
              style={styles.profileStyle}
              editButton={renderPhotoButton}
            />
          </View>
          <Formik
            initialValues={{
              email: authData.email,
              mobileNumber: authData.mobileNumber || '',
              fullName: authData.fullName,
              userName: authData.userName,
              dob: undefined,
              pubgUsername: '',
              freeFireUsername: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, actions) => {
              setIsLoading(true);

              const payload = {
                ...values,
                dob: firebase.firestore.Timestamp.fromDate(values.dob as any),
              };
              const response = await User.set(authData.userId, {...payload});
              const userData = {
                ...response?.data,
                createdAt: response?.data?.createdAt?.toDate()?.getTime(),
                dob: response?.data?.dob?.toDate()?.getTime(),
              };
              console.log(userData, 'data');
              signupUserProp(userData);
              setIsLoading(false);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }: any) => (
              <View style={[GlobalStyles.p10]}>
                <View style={GlobalStyles.flexRowWrap1}>
                  {fields.map((field, index) => (
                    <Input
                      key={field.fieldName}
                      autoCapitalize={field.autoCapitalize}
                      placeholder={field.placeholder}
                      accessoryRight={field.accessoryRight}
                      value={values[field.fieldName]}
                      keyboardType={field.keyboardType}
                      onChangeText={handleChange(field.fieldName)}
                      onBlur={handleBlur(field.fieldName)}
                      autoCompleteType={field.autoCompleteType}
                      style={[
                        index === fields.length ? null : styles.input,
                        styles.inputField,
                      ]}
                      captionIcon={
                        errors[field.fieldName] ? field.captionIcon : undefined
                      }
                      status={errors[field.fieldName] ? 'danger' : ''}
                      caption={errors[field.fieldName] || field.caption}
                      disabled={field.disabled}
                      label={field.label}
                    />
                  ))}
                  <Datepicker
                    label="Date of birth"
                    placeholder="Pick date"
                    captionIcon={errors.dob ? CaptionIcon : undefined}
                    caption={errors.dob}
                    status={errors.dob ? 'danger' : ''}
                    date={values.dob}
                    onSelect={(date) => setFieldValue('dob', date)}
                    accessoryRight={CalendarIcon}
                  />
                </View>
                <View style={GlobalStyles.mb30} />
                <Button size="giant" onPress={handleSubmit}>
                  Update
                </Button>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  fieldWidth: {width: widthPercentageToDP(45)},
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 5,
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
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileStyle: {width: 100, height: 100},
  inputField: {
    // width: widthPercentageToDP(90),
  },
  backIcon: {position: 'absolute', left: 0},
});

const mapStateToProps = (state) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  signupUserProp: signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
