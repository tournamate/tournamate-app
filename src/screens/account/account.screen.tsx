import React from 'react';
import {StyleSheet, Text, View, ScrollView, ImageProps} from 'react-native';
import {Layout, ListItem, Avatar, Divider, List} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {AuthSchema} from '../../models/user.models';
import {
  PersonLineIcon,
  HomeLineIcon,
  ArrowForwardIcon,
  ArrowIOSForward,
} from '../../components/icons.component';
import {widthPercentageToDP} from '../../shared/methods/normalize';

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
  id: Math.random(),
});

const Account = ({
  authData,
  navigation,
}: {
  authData: AuthSchema;
  navigation: any;
}) => {
  const ItemImage = () => <Avatar source={{uri: authData.photo}} />;

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      key={index}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={PersonLineIcon}
      accessoryRight={ArrowIOSForward}
      onPress={() => console.log('pressed')}
    />
  );

  return (
    <ScrollView>
      <Layout style={{flex: 1}}>
        <ListItem
          title={authData.fullName}
          description={authData.mobileNumber || authData.email}
          accessoryLeft={ItemImage}
          style={{marginBottom: 10}}
        />
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              // width: widthPercentageToDP(33),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              paddingHorizontal: 5,
              paddingVertical: 10,
            }}>
            <Text>Matches Won</Text>
            <Text>20</Text>
          </View>
          <View
            style={{
              // width: widthPercentageToDP(33),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text>Matches Won</Text>
            <Text>20</Text>
          </View>
          <View
            style={{
              // width: widthPercentageToDP(33),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text>Matches Won</Text>
            <Text>20</Text>
          </View>
        </View>
        <Divider />
        <List style={styles.container} data={data} renderItem={renderItem} />
      </Layout>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = {
  //   signupUserState: signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
