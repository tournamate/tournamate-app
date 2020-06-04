import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, BackHandler} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import BottomSheet from 'reanimated-bottom-sheet';

import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';
import {AuthSchema} from '../../models/user.models';
import {ProfileDetails} from '../../components/profile-bottom-sheet.component';
import ImageCarousel from '../../components/carousels/type-1.carousel.component';
import {ArrowForwardIcon} from '../../components/icons.component';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Dashboard = (props: {authData: AuthSchema; navigation: any}) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const {authData} = props;
  const handleOnPhotoPress = () => {
    setIsOpenProfile(true);
    setTimeout(() => {
      actionSheetRef.current.snapTo(0);
    }, 10);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      actionSheetRef?.current?.snapTo(4);
      return true;
    });
  }, []);
  const actionSheetRef = useRef<any>();
  return (
    <Layout style={styles.container} level="3">
      <DashboardTopNav
        name={authData.fullName}
        photoUrl={authData.photo}
        onPressPhoto={handleOnPhotoPress}
        navigation={props.navigation}
      />
      <ImageCarousel onSnapToItem={() => null} parentHeight={200} />
      <View style={{marginBottom: 20, marginTop: 20}}>
        <View
          style={[
            {flexDirection: 'row', justifyContent: 'space-between'},
            styles.gutter,
          ]}>
          <Text category="h5" status="basic">
            Upcoming matches
          </Text>
          <TouchableWithoutFeedback
            onPress={() => actionSheetRef.current.snapTo(0)}>
            <ArrowForwardIcon style={{width: 30, height: 30}} fill="#fff" />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ProfileDetails
        actionSheetRef={actionSheetRef}
        onClose={() => setIsOpenProfile(false)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  gutter: {
    paddingHorizontal: 20,
  },
});

const mapStateToProps = (state: any) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  //   signupUserState: signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
