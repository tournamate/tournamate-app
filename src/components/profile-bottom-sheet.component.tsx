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
import {AvatarUrls} from '../constants/data.constants';
import normalize from '../shared/methods/normalize';
import {CaptionIcon} from './icons.component';
import {AuthSchema} from '../models/user.models';

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
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<{userName: string; fullName: string}>({
    userName: '',
    fullName: '',
  });

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
  const handlePressAvatar = (imageUrl: string) => {
    setSelectedAvatar(imageUrl);
  };
  const handleSubmit = () => {
    console.log('submit');
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
                onPress={handlePressAvatar.bind(this, imageUrl)}
                key={imageUrl}>
                <Avatar
                  style={[
                    styles.avatar as any,
                    imageUrl === selectedAvatar ? styles.avatarSelected : null,
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
            onChangeText={setUserName}
            captionIcon={errors.userName ? CaptionIcon : undefined}
            caption={errors.userName}
            status={errors.userName ? 'danger' : ''}
            value={userName}
          />
          <Input
            label="Your full name"
            placeholder="Full name"
            style={styles.input2}
            value={fullName}
            onChangeText={setFullName}
            captionIcon={errors.fullName ? CaptionIcon : undefined}
            caption={errors.fullName}
            status={errors.fullName ? 'danger' : ''}
          />
          <View style={styles.btnContainer}>
            <Button size="small" style={styles.saveBtn} onPress={handleSubmit}>
              Save
            </Button>
          </View>
        </Layout>
      </ScrollView>
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
    minHeight: 900,
    height: normalize(400, 'height'),
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
  btnContainer: {justifyContent: 'center', alignItems: 'center'},
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
