import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Layout,
  Text,
  Tab,
  TabView,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {CommonTopNav} from '../../components/top-navigations/common-top.component';
import {GlobalStyles} from '../../constants/global-styles';
import {PeopleLineIcon, AwardLineIcon} from '../../components/icons.component';

const PrizeLeaderBoard = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const styles = useStyleSheet(themedStyles);
  return (
    <React.Fragment>
      <CommonTopNav
        title="Prizes and Leaderboard"
        onPress={() => props.navigation.goBack()}
      />
      <Layout style={[GlobalStyles.flex1, GlobalStyles.cGutter]}>
        <ScrollView>
          <Text>Prize Leaderboard</Text>
          <TabView
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}>
            <Tab title="PRIZES">
              <Layout level="3" style={{borderRadius: 4}}>
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
                    <Text category="p2">₹ 400 Prize pool*</Text>
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    {
                      backgroundColor: '#505251',
                      padding: 5,
                      marginHorizontal: 5,
                      marginBottom: 10,
                      borderRadius: 4,
                    },
                  ]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹ 4000* </Text>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    {
                      //   backgroundColor: '#505251',
                      padding: 5,
                      marginHorizontal: 5,
                      marginBottom: 10,
                      borderRadius: 4,
                    },
                  ]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹ 400 </Text>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    {
                      backgroundColor: '#505251',
                      padding: 5,
                      marginHorizontal: 5,
                      marginBottom: 10,
                      borderRadius: 4,
                    },
                  ]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹ 400 </Text>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRowWrap1,
                    {
                      //   backgroundColor: '#505251',
                      padding: 5,
                      marginHorizontal: 5,
                      marginBottom: 10,
                      borderRadius: 4,
                    },
                  ]}>
                  <Text>Rank: 1</Text>
                  <Text style={GlobalStyles.fontBold}>₹ 400 </Text>
                </View>
              </Layout>
            </Tab>
            <Tab title="LEADERBOARD">
              <Layout style={styles.tabContainer}>
                <Text category="h5">Leaderboard</Text>
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
});
export default PrizeLeaderBoard;
