import React from 'react';
import {View, VirtualizedList, ScrollView} from 'react-native';
import {Layout, Text, Divider, Avatar, Card} from '@ui-kitten/components';
import {GlobalStyles} from '../../constants/global-styles';
import {CommonTopNav} from '../../components/top-navigations/common-top.component';
import CardInList from '../../components/game-cards/card-list.component';
import {RouterConstants} from '../../constants/router.constants';

const UserProfile = (props) => {
  const tempData = [
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Karthik',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Ashok',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Shankar',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
    {
      title: 'Cards contain content and actions about a single subject',
      entryPrice: 50,
      organizer: 'Newton',
      participants: {joined: 30, total: 100},
      tags: ['Pubg', 'Solo', 'Vekandi'],
      timing: {},
    },
  ];
  const getItem = (data, index) => data[index];

  return (
    <React.Fragment>
      <CommonTopNav title="Profile" onPress={() => props.navigation.goBack()} />
      <Divider />
      <Layout style={[GlobalStyles.flex1, GlobalStyles.cGutter]}>
        <ScrollView>
          <View style={GlobalStyles.aiCenter}>
            <Avatar
              source={{
                uri:
                  'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
              }}
              size="giant"
              style={[{width: 75, height: 75}, GlobalStyles.mb10]}
            />
            <Text category="h4">Karan Johar</Text>
            <Text appearance="hint" style={GlobalStyles.mb20}>
              @karan897
            </Text>
          </View>
          <Divider style={GlobalStyles.mb10} />
          <View style={[GlobalStyles.flexRowWrap1, GlobalStyles.mb10]}>
            <View style={[GlobalStyles.aiCenter]}>
              <Text
                category="h5"
                style={[GlobalStyles.fontBold, GlobalStyles.mb5]}>
                456
              </Text>
              <Text appearance="hint">Matches played</Text>
            </View>
            <View style={[GlobalStyles.aiCenter]}>
              <Text
                category="h5"
                status="warning"
                style={[GlobalStyles.fontBold, GlobalStyles.mb5]}>
                ₹5000
              </Text>
              <Text appearance="hint">Total earned</Text>
            </View>
            <View style={[GlobalStyles.aiCenter]}>
              <Text
                category="h5"
                style={[GlobalStyles.fontBold, GlobalStyles.mb5]}>
                456
              </Text>
              <Text appearance="hint">Games Playing</Text>
            </View>
          </View>
          <Divider style={GlobalStyles.mb20} />
          <View style={GlobalStyles.mb20}>
            <Text category="h6" style={GlobalStyles.mb10}>
              Games Playing
            </Text>
            <View style={GlobalStyles.flexRowWrap2}>
              {['Pubg', 'Freefire', 'Ludo'].map((obj) => (
                <Card
                  status="danger"
                  onPress={() => console.log('pressed')}
                  style={GlobalStyles.mr15}>
                  <Text>{obj}</Text>
                </Card>
              ))}
            </View>
          </View>
          <Text category="h6" style={GlobalStyles.mb10}>
            Latest Played Matches
          </Text>
          <VirtualizedList
            data={tempData}
            style={GlobalStyles.mb20}
            horizontal
            initialNumToRender={4}
            getItem={getItem}
            keyExtractor={(item) => item.organizer}
            getItemCount={() => 4}
            renderItem={({item, index}: {item: any; index: number}) => {
              return (
                <CardInList
                  key={item.organizer}
                  onPress={() =>
                    props.navigation.navigate(RouterConstants.ContestDetails)
                  }
                  index={index}
                  title={item.title}
                  entryPrice={item.entryPrice}
                  organizer={item.organizer}
                  participants={item.participants}
                  tags={item.tags}
                  timing={item.timing}
                />
              );
            }}
          />
          <Text category="h6" style={GlobalStyles.mb10}>
            Latest Played Matches
          </Text>
          <VirtualizedList
            data={tempData}
            style={GlobalStyles.mb20}
            horizontal
            initialNumToRender={4}
            getItem={getItem}
            keyExtractor={(item) => item.organizer}
            getItemCount={() => 4}
            renderItem={({item, index}: {item: any; index: number}) => {
              return (
                <CardInList
                  key={item.organizer}
                  onPress={() =>
                    props.navigation.navigate(RouterConstants.ContestDetails)
                  }
                  index={index}
                  title={item.title}
                  entryPrice={item.entryPrice}
                  organizer={item.organizer}
                  participants={item.participants}
                  tags={item.tags}
                  timing={item.timing}
                />
              );
            }}
          />
        </ScrollView>
      </Layout>
    </React.Fragment>
  );
};

export default UserProfile;
