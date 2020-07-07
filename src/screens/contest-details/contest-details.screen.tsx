import React, {useState} from 'react';
import {
  Layout,
  Text,
  StyleService,
  useStyleSheet,
  Button,
  Input,
  Card,
} from '@ui-kitten/components';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {CommonTopNav} from '../../components/top-navigations/common-top.component';
import {GlobalStyles} from '../../constants/global-styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../shared/methods/normalize';
import {
  ArrowForwardIcon,
  DoneAllIcon,
  ArrowDownIOSIcon,
  ClockLineIcon,
  CopyLineIcon,
} from '../../components/icons.component';
import {KeyboardAvoidingView} from '../../components/kb-avoiding-view.component';
import UserPreview from '../../components/user-preview.component';
import {setToClipboard} from '../../shared/methods/clipboard';
import {HomeDrawerNavProps} from '../../navigation/navigation.types';

const ContestDetails = ({navigation}: HomeDrawerNavProps<'ContestDetails'>) => {
  const [isShowMoreNotes, setIsShowMoreNotes] = useState(false);
  const [isShowMoreRules, setIsShowMoreRules] = useState(false);
  const styles = useStyleSheet(themedStyles);
  const tempStr =
    'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.';

  return (
    <>
      <CommonTopNav
        title="Contest Details"
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView>
        <ScrollView>
          <Layout style={[GlobalStyles.flex1, GlobalStyles.cGutter]}>
            <View style={[GlobalStyles.flexRowWrap2, GlobalStyles.mb15]}>
              <Image
                source={{
                  uri:
                    'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
                }}
                style={styles.gameImage as any}
              />
              <View style={GlobalStyles.mb15}>
                <Text category="h5">Contest Details</Text>
                <Text category="p2" status="success" style={GlobalStyles.mb10}>
                  Ashok
                </Text>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                  <ClockLineIcon
                    style={styles.icon}
                    fill={styles.iconColor.backgroundColor}
                  />
                  <Text category="label">Today 12PM</Text>
                </View>
                <View style={styles.tagWrap}>
                  {['Pubg', 'Solo', 'Vekandi'].map((tag) => (
                    <Button
                      size="tiny"
                      style={styles.tagBtn}
                      appearance="outline"
                      status="warning">
                      {tag}
                    </Button>
                  ))}
                </View>
              </View>
            </View>
            <View style={[GlobalStyles.flexRowWrap1, GlobalStyles.mb30]}>
              <View style={styles.textShow}>
                <Text> ₹49</Text>
                <Text>per entry</Text>
              </View>
              <View style={styles.borderRight} />
              <View style={styles.textShow}>
                <Text
                  style={GlobalStyles.fontBold}
                  category="h5"
                  status="warning">
                  ₹5000
                </Text>
                <Text style={GlobalStyles.tAlignCenter}>
                  Expected prize pool
                </Text>
              </View>
              <View style={styles.borderRight} />
              <View style={styles.textShow}>
                <Text> 45</Text>
                <Text style={GlobalStyles.tAlignCenter}>
                  Players joined out of 100
                </Text>
              </View>
            </View>
            <View style={GlobalStyles.mb15}>
              <Button size="medium" status="success">
                Register & Participate
              </Button>
              {/* <View style={GlobalStyles.flexRowWrap1}>
            <Button
              size="medium"
              status="danger"
              style={{width: widthPercentageToDP(45)}}>
              Cancel
            </Button>
            <Button
              size="medium"
              status="success"
              style={{width: widthPercentageToDP(45)}}>
              Done
            </Button>
          </View> */}
            </View>
            <View style={[GlobalStyles.mb15, GlobalStyles.flexRowWrap2]}>
              <View
                style={[{width: widthPercentageToDP(50)}, GlobalStyles.mr10]}>
                <Text category="h6" style={[GlobalStyles.mb10]}>
                  Game Details
                </Text>
                <View style={GlobalStyles.flexRowWrap1}>
                  {[
                    {title: 'Game', subTitle: 'Pubg'},
                    {title: 'Game map', subTitle: 'All weapons'},
                    {title: 'Team', subTitle: 'Solo'},
                    {title: 'Server', subTitle: 'Asia'},
                  ].map((obj) => (
                    <View
                      style={[
                        GlobalStyles.mr10,
                        GlobalStyles.mb10,
                        {width: widthPercentageToDP(22)},
                      ]}>
                      <Text category="label">{obj.title}</Text>
                      <Text category="p1" status="basic">
                        {obj.subTitle}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View>
                <Text
                  category="h6"
                  style={[GlobalStyles.mb10, GlobalStyles.fontBold]}>
                  Room Details
                </Text>
                <View>
                  {[
                    {title: 'Room ID', subTitle: '234234234'},
                    {title: 'Password', subTitle: '34534545'},
                  ].map((obj) => (
                    <View style={[GlobalStyles.mr10, GlobalStyles.mb10]}>
                      <Text category="label">{obj.title}</Text>
                      <View style={GlobalStyles.flexRowWrap4}>
                        <Text category="p1" status="basic">
                          {obj.subTitle}
                        </Text>
                        <Button
                          accessoryRight={CopyLineIcon}
                          onPress={() => setToClipboard(obj.subTitle)}
                          appearance="ghost"
                          size="tiny"
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View style={GlobalStyles.mb15}>
              <TouchableOpacity
                style={[GlobalStyles.flexRowWrap1, GlobalStyles.aiCenter]}
                onPress={() => navigation.navigate('PrizeLeaderboard')}>
                <Text
                  category="h6"
                  style={[GlobalStyles.mb10, GlobalStyles.fontBold]}>
                  Prize Details & Leaderboard
                </Text>
                <ArrowForwardIcon
                  style={GlobalStyles.icon1}
                  fill={styles.iconColor.backgroundColor}
                />
              </TouchableOpacity>
            </View>
            <View style={GlobalStyles.mb15}>
              <Card>
                <TouchableOpacity
                  style={[GlobalStyles.flexRowWrap1, GlobalStyles.aiCenter]}
                  onPress={() => setIsShowMoreNotes(!isShowMoreNotes)}>
                  <Text category="h6" style={[GlobalStyles.mb10]}>
                    Notes from organizer
                  </Text>
                  <ArrowDownIOSIcon
                    style={GlobalStyles.icon1}
                    fill={styles.iconColor.backgroundColor}
                  />
                </TouchableOpacity>
                <Collapsible collapsed={!isShowMoreNotes}>
                  <Text category="p1">{tempStr}</Text>
                </Collapsible>
              </Card>
            </View>
            <View style={GlobalStyles.mb15}>
              <Card>
                <TouchableOpacity
                  style={[GlobalStyles.flexRowWrap1, GlobalStyles.aiCenter]}
                  onPress={() => setIsShowMoreRules(!isShowMoreRules)}>
                  <Text category="h6" style={[GlobalStyles.mb10]}>
                    Rules and regulations
                  </Text>
                  <ArrowDownIOSIcon
                    style={GlobalStyles.icon1}
                    fill={styles.iconColor.backgroundColor}
                  />
                </TouchableOpacity>
                <Collapsible collapsed={!isShowMoreRules}>
                  <Text category="p1">{tempStr}</Text>
                </Collapsible>
              </Card>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={GlobalStyles.mb15}
              onPress={() => navigation.navigate('UserProfile')}>
              <Text category="h6" style={[GlobalStyles.mb10]}>
                About organizer
              </Text>
              <UserPreview />
            </TouchableOpacity>

            <View style={GlobalStyles.mb30} />
          </Layout>
          <Layout
            level="4"
            style={[
              {height: heightPercentageToDP(89.9)},
              GlobalStyles.cGutter,
              GlobalStyles.pv10,
            ]}>
            <Text style={GlobalStyles.mb10} category="h6">
              Comments
            </Text>
            <Input accessoryRight={DoneAllIcon} />
          </Layout>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const themedStyles = StyleService.create({
  iconColor: {
    backgroundColor: 'text-basic-color',
  },
  gameImage: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(15),
    borderRadius: 10,
    marginRight: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  borderRight: {
    borderRightColor: 'border-alternative-color-5',
    borderRightWidth: 0.8,
  },
  textShow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(30),
  },
  showMoreBtn: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    width: widthPercentageToDP(95),
    position: 'absolute',
    bottom: -15,
    paddingVertical: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    // marginVertical: 10,
  },
  cardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-basic-transparent-300',
    width: widthPercentageToDP(30),
    paddingVertical: 5,
  },
  tagWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  tagBtn: {marginRight: 5, marginBottom: 5, height: 10},
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});

export default ContestDetails;
