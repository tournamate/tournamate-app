import React from 'react';
import {View, ScrollView} from 'react-native';
import {
  Layout,
  Text,
  Tab,
  TabView,
  StyleService,
  useStyleSheet,
  Avatar,
} from '@ui-kitten/components';
import {CommonTopNav} from '../../components/top-navigations/common-top.component';
import {GlobalStyles} from '../../constants/global-styles';
import {PeopleLineIcon, AwardLineIcon} from '../../components/icons.component';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';
import {AuthSchema} from '../../models/user.models';

interface Props extends HomeDrawerNavProps<'PrizeLeaderboard'> {
  authData: AuthSchema;
}

const PrizeLeaderBoard = ({navigation}: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const styles = useStyleSheet(themedStyles);
  return (
    <React.Fragment>
      <CommonTopNav
        title="Prizes and Leaderboard"
        onPress={() => navigation.goBack()}
      />
      <Layout style={[GlobalStyles.flex1, GlobalStyles.cGutter]}>
        <ScrollView>
          <Text category="c1" status="danger" style={GlobalStyles.mb10}>
            *Leaderboard will be updated once the match ends
          </Text>
          <TabView
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}>
            <Tab title="PRIZES">
              <Layout level="3" style={GlobalStyles.br4}>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    GlobalStyles.mh10,
                    GlobalStyles.mb10,
                    GlobalStyles.pv10,
                  ]}>
                  <View style={GlobalStyles.flexRowWrap1}>
                    <PeopleLineIcon
                      style={GlobalStyles.icon}
                      fill={styles.iconColor.backgroundColor}
                    />
                    <Text category="p2">48 players</Text>
                  </View>
                  <View style={GlobalStyles.flexRowWrap1}>
                    <AwardLineIcon
                      style={GlobalStyles.icon}
                      fill={styles.iconColor.backgroundColor}
                    />
                    <Text category="p2">₹400 Prize pool*</Text>
                  </View>
                </View>
                <View style={[GlobalStyles.flexRowWrap1, styles.row1]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹4000* </Text>
                </View>
                <View style={[GlobalStyles.flexRowWrap1, styles.row1]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹400 </Text>
                </View>
                <View style={[GlobalStyles.flexRowWrap1, styles.row1]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹400 </Text>
                </View>
                <View style={[GlobalStyles.flexRowWrap1, styles.row1]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹400 </Text>
                </View>
              </Layout>
            </Tab>
            <Tab title="LEADERBOARD">
              <Layout level="2" style={GlobalStyles.br4}>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    GlobalStyles.mh10,
                    GlobalStyles.mb10,
                    GlobalStyles.pv10,
                  ]}>
                  <View style={GlobalStyles.flexRowWrap1}>
                    <PeopleLineIcon
                      style={GlobalStyles.icon}
                      fill={styles.iconColor.backgroundColor}
                    />
                    <Text category="p2">Players</Text>
                  </View>
                  <View style={GlobalStyles.flexRowWrap1}>
                    <AwardLineIcon
                      style={GlobalStyles.icon}
                      fill={styles.iconColor.backgroundColor}
                    />
                    <Text category="p2">Rank</Text>
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    GlobalStyles.aiCenter,
                    styles.row1,
                  ]}>
                  <View style={GlobalStyles.flexRowWrap4}>
                    <Avatar
                      source={{
                        uri:
                          'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
                      }}
                      size="small"
                      style={GlobalStyles.mr5}
                    />
                    <Text>Karthik</Text>
                  </View>
                  <Text style={GlobalStyles.fontBold}>- </Text>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    GlobalStyles.aiCenter,
                    styles.row1,
                  ]}>
                  <View style={GlobalStyles.flexRowWrap4}>
                    <Avatar
                      source={{
                        uri:
                          'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
                      }}
                      size="small"
                      style={GlobalStyles.mr5}
                    />
                    <Text>Shiva</Text>
                  </View>
                  <Text style={GlobalStyles.fontBold}>- </Text>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    GlobalStyles.aiCenter,
                    styles.row1,
                  ]}>
                  <View style={GlobalStyles.flexRowWrap4}>
                    <Avatar
                      source={{
                        uri:
                          'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
                      }}
                      size="small"
                      style={GlobalStyles.mr5}
                    />
                    <Text>John</Text>
                  </View>
                  <Text style={GlobalStyles.fontBold}>- </Text>
                </View>
              </Layout>
            </Tab>
          </TabView>
        </ScrollView>
      </Layout>
    </React.Fragment>
  );
};
const themedStyles = StyleService.create({
  tabContainer: {
    // height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconColor: {
    backgroundColor: 'text-basic-color',
  },
  row1: {
    padding: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 4,
  },
});
export default PrizeLeaderBoard;
