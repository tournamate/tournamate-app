import React, {createRef, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';
import {AuthSchema} from '../../models/user.models';
import {ProfileDetails} from '../../components/profile-bottom-sheet.component';

const actionSheetRef = createRef<any>();
const Dashboard = (props: {authData: AuthSchema; navigation: any}) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const {authData} = props;
  const handleOnPhotoPress = () => {
    setIsOpenProfile(true);
    setTimeout(() => {
      if (actionSheetRef?.current?.setModalVisible) {
        actionSheetRef?.current?.setModalVisible();
      }
    }, 10);
  };
  return (
    <Layout style={styles.container}>
      <DashboardTopNav
        name={authData.fullName}
        photoUrl={authData.photo}
        onPressPhoto={handleOnPhotoPress}
        navigation={props.navigation}
      />
      <Text category="h1">Dashboard</Text>
      {isOpenProfile ? (
        <ProfileDetails
          actionSheetRef={actionSheetRef}
          onClose={() => setIsOpenProfile(false)}
        />
      ) : null}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
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
