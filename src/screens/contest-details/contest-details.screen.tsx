import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {CommonTopNav} from '../../components/top-navigations/common-top.component';

const ContestDetails = ({navigation}: {navigation: any}) => {
  return (
    <Layout style={{flex: 1}}>
      <CommonTopNav
        title="Contest Details"
        onPress={() => navigation.goBack()}
      />
      <Text>Contest Details</Text>
    </Layout>
  );
};

export default ContestDetails;
