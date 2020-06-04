import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

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
import BottomSheet from 'reanimated-bottom-sheet';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {AvatarUrls} from '../constants/data.constants';
import {SCREEN_HEIGHT} from '../shared/methods/normalize';
import {CaptionIcon} from './icons.component';
import {AuthSchema} from '../models/user.models';

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
}: {
  authData: AuthSchema;
  actionSheetRef: any;
  onClose: () => any;
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [fullName, setFullName] = useState('');


  useEffect(() => {
    setSelectedAvatar(AvatarUrls[0]);
    if (authData?.fullName) {
      setFullName(authData.fullName);
    }
  }, [authData]);

  const styles = useStyleSheet(themedStyles);

  const renderInner = () => (
    <KeyboardAvoidingView enabled={false}>
      <Layout style={styles.panel}>
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
              <View>
                <Text category="h4" style={styles.headText}>
                  Your Details!
                </Text>
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
              </View>
            </>
          )}
        </Formik>
      </Layout>
    </KeyboardAvoidingView>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  return (
    <BottomSheet
      ref={actionSheetRef}
      snapPoints={[SCREEN_HEIGHT - 80, 500, 400, 300, 30]}
      initialSnap={3}
      renderContent={renderInner}
      renderHeader={renderHeader}
      enabledGestureInteraction
      enabledBottomClamp
      enabledInnerScrolling={false}
      enabledBottomInitialAnimation
      onCloseEnd={() => console.log('close end')}
      onOpenEnd={() => console.log('open end')}
    />
  );
};

const IMAGE_SIZE = 200;

const themedStyles = StyleService.create({
  scrollContainer: {
    width: '100%',
  },
  sheetContainer: {
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: 20,
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
  // Delete later
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 800,
    padding: 20,
    // maxHeight: 400,
    // backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: 'background-basic-color-1',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
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
