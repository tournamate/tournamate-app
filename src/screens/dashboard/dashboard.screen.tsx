import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';
import {AuthSchema} from '../../models/user.models';

const Dashboard = (props: {authData: AuthSchema; navigation: any}) => {
  const {authData} = props;
  const handleOnPhotoPress = () => {
    console.log('pressed');
  };
  return (
    <Layout style={styles.container}>
      <DashboardTopNav
        name={authData.fullName}
        photoUrl={authData.photo}
        onPressPhoto={handleOnPhotoPress}
      />
      <Text category="h1">Dashboard</Text>
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
