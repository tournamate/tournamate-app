import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {DashboardTopNav} from '../../components/top-navigations/dashboard-top.component';

const Dashboard = () => {
  return (
    <Layout style={{flex: 1}}>
      <DashboardTopNav />
      <Text category="h1">Dashboard</Text>
    </Layout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
