import React, {useState, useEffect} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  Layout,
  Text,
  StyleService,
  useStyleSheet,
  Input,
  Avatar,
  Button,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {AvatarUrls} from '../constants/data.constants';
import {SCREEN_HEIGHT} from '../shared/methods/normalize';
import {CaptionIcon} from './icons.component';
import {AuthSchema} from '../models/user.models';
import {KeyboardAvoidingView} from './kb-avoiding-view.component';

=======
import {AvatarUrls} from '../constants/data.constants';
import normalize from '../shared/methods/normalize';
import {CaptionIcon} from './icons.component';
import {AuthSchema} from '../models/user.models';
  
  
const phoneRegExp = /^(\+?\d{0,8})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const ProfileSchema = Yup.object().shape({
  userName: Yup.string()
    .min(4, 'Too short!')
    .max(10, 'Too large!')
    .required('Username is required'),
  fullName: Yup.string()
    .min(3, 'Too small!')
    .max(35, 'Too large!')
    .required('Full name is required'),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const ProfileDetailsComponent = ({
  actionSheetRef,
  authData,
  onClose,
}: {
  authData: AuthSchema;
  actionSheetRef: any;
  onClose: () => any;
}) => {
  const [nestedScrollEnabled, setNestedScrollEnabled] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [fullName, setFullName] = useState('');


  useEffect(() => {
    setSelectedAvatar(AvatarUrls[0]);
    if (authData?.fullName) {
      setFullName(authData.fullName);
    }
  }, [authData]);

  const _onClose = () => {
    setNestedScrollEnabled(false);
    if (onClose) {
      onClose();
    }
  };
  const styles = useStyleSheet(themedStyles);
  return (
    <ActionSheet
      initialOffsetFromBottom={0.5}
      ref={actionSheetRef}
      bounceOnOpen={true}
      bounciness={12}
      gestureEnabled={true}
      onClose={_onClose}
      defaultOverlayOpacity={0.3}
      openAnimationSpeed={8}
      containerStyle={styles.sheetContainer}>
      <KeyboardAvoidingView>
        <Formik
          initialValues={{
            userName: '',
            fullName: fullName,
            avatar: selectedAvatar,
            mobileNumber: 0,
            dob: '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values) => {
            console.log(values);
            // props.signinUser(values);
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }: any) => (
            <>
              <ScrollView
                nestedScrollEnabled={true}
                scrollEnabled={nestedScrollEnabled}
                style={styles.scrollContainer}>
                <Layout>
                  <Text category="h4" style={styles.headText}>
                    Your Details!
                  </Text>
                  <Text style={styles.text1}>Choose your Avatar!</Text>
                  <ScrollView horizontal style={styles.horizontalScroll}>
                    {AvatarUrls.map((imageUrl) => (
                      <TouchableOpacity
                        onPress={() => setFieldValue('avatar', imageUrl)}
                        key={imageUrl}>
                        <Avatar
                          style={[
                            styles.avatar as any,
                            imageUrl === values.avatar
                              ? styles.avatarSelected
                              : null,
                          ]}
                          source={{uri: imageUrl}}
                          size="giant"
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <Input
                    label="Your username"
                    placeholder="Username"
                    style={styles.input1}
                    onChangeText={handleChange('userName')}
                    captionIcon={errors.userName ? CaptionIcon : undefined}
                    caption={errors.userName}
                    status={errors.userName ? 'danger' : ''}
                    value={values.userName}
                  />
                  <Input
                    label="Your full name"
                    placeholder="Full name"
                    style={styles.input2}
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    captionIcon={errors.fullName ? CaptionIcon : undefined}
                    caption={errors.fullName}
                    status={errors.fullName ? 'danger' : ''}
                  />
                  <Input
                    label="Your mobile number"
                    placeholder="Mobile number"
                    style={styles.input2}
                    value={values.mobileNumber}
                    onChangeText={handleChange('mobileNumber')}
                    captionIcon={errors.mobileNumber ? CaptionIcon : undefined}
                    caption={errors.mobileNumber}
                    status={errors.mobileNumber ? 'danger' : ''}
                  />
                  <Input
                    label="Your Date of birth"
                    placeholder="DOB"
                    style={styles.input2}
                    value={values.dob}
                    onChangeText={(text) => {
                      let value = text.replace(
                        /^([\d]{4})([\d]{2})([\d]{2})$/,
                        '$1/$2/$3',
                      );
                      console.log(value, 'value');
                      setFieldValue('dob', value);
                    }}
                    captionIcon={errors.dob ? CaptionIcon : undefined}
                    caption={errors.dob}
                    status={errors.dob ? 'danger' : ''}
                  />

                  <View style={styles.btnContainer}>
                    <Button
                      size="small"
                      style={styles.saveBtn}
                      onPress={handleSubmit}>
                      Save
                    </Button>
                  </View>
                </Layout>
              </ScrollView>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ActionSheet>
  );
};

const themedStyles = StyleService.create({
  scrollContainer: {
    width: '100%',
  },
  sheetContainer: {
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: 20,
    minHeight: SCREEN_HEIGHT,
    // height: normalize(700, 'height'),
  },
  logo: {
    marginHorizontal: 16,
  },
  text1: {marginBottom: 10},
  avatar: {marginRight: 16},
  avatarSelected: {borderColor: 'color-primary-500', borderWidth: 4},
  horizontalScroll: {flexDirection: 'row', marginBottom: 15},
  headText: {
    textAlign: 'center',
    marginBottom: 15,
  },
  input1: {
    marginBottom: 10,
  },
  input2: {
    marginBottom: 10,
  },
  saveBtn: {width: 100},
  btnContainer: {justifyContent: 'center', alignItems: 'center', marginTop: 20},
});

const mapStateToProps = (state: any) => {
  console.log(state, 'state');
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  //   signupUserState: signupUser,
};

export const ProfileDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDetailsComponent);
