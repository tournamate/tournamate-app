import React, {useState} from 'react';
import {
  Layout,
  Text,
  StyleService,
  useStyleSheet,
  Button,
  Input,
} from '@ui-kitten/components';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {CommonTopNav} from '../../components/top-navigations/common-top.component';
import {GlobalStyles} from '../../constants/global-styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../shared/methods/normalize';
import {
  PersonLineIcon,
  ArrowForwardIcon,
  DoneAllIcon,
} from '../../components/icons.component';
import {trimString} from '../../shared/methods/trimString';
import {RateBar} from '../../components/rate-bar.component';
import {KeyboardAvoidingView} from '../../components/kb-avoiding-view.component';

const ContestDetails = ({navigation}: {navigation: any}) => {
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
                <Text category="p2" status="success">
                  Ashok
                </Text>
              </View>
            </View>
            <View style={[GlobalStyles.flexRowWrap1, GlobalStyles.mb15]}>
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
                  Expected winning price
                </Text>
              </View>
              <View style={styles.borderRight} />
              <View style={styles.textShow}>
                <Text> 45</Text>
                <Text style={GlobalStyles.tAlignCenter}>Joined out of 100</Text>
              </View>
            </View>
            <View style={GlobalStyles.mb15}>
              <Button size="medium" status="success">
                Participate
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
            <View style={GlobalStyles.mb30}>
              <Text
                category="h6"
                style={[GlobalStyles.mb10, GlobalStyles.fontBold]}>
                Notes from organizer
              </Text>
              <Text category="p2">
                {isShowMoreNotes ? tempStr : trimString(tempStr, 150)}
              </Text>
              {!isShowMoreNotes ? (
                <TouchableOpacity
                  style={styles.showMoreBtn}
                  activeOpacity={0.8}
                  onPress={() => setIsShowMoreNotes(true)}>
                  <Text style={GlobalStyles.tAlignCenter} appearance="hint">
                    Show more
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity activeOpacity={0.8} style={GlobalStyles.mb15}>
              <Text
                category="h6"
                style={[GlobalStyles.mb10, GlobalStyles.fontBold]}>
                About organizer
              </Text>
              <View style={[GlobalStyles.flexRowWrap1, GlobalStyles.mb15]}>
                <View style={GlobalStyles.flexRowWrap2}>
                  <Image
                    source={{
                      uri:
                        'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
                    }}
                    style={styles.profileImage as any}
                  />
                  <View style={GlobalStyles.mb15}>
                    <Text category="h5">Karthikeyan</Text>
                    <Text category="p2" status="basic">
                      user1235
                    </Text>
                    <RateBar
                      value={4}
                      style={{marginLeft: -5}}
                      onValueChange={() => null}
                    />
                  </View>
                </View>
                <View>
                  <ArrowForwardIcon
                    style={GlobalStyles.icon1}
                    fill={styles.iconColor.backgroundColor}
                  />
                </View>
              </View>
              <View style={styles.cardContainer}>
                {[
                  {title: 'Matches organized', subText: '20'},
                  {title: 'Money Earned', subText: '₹1,000‎'},
                  {title: 'Matches Won', subText: '20'},
                ].map((item) => (
                  <View style={styles.cardItem}>
                    <Text
                      status="basic"
                      style={GlobalStyles.fontBold}
                      category="h6">
                      {item.subText}
                    </Text>
                    <Text status="basic" style={GlobalStyles.tAlignCenter}>
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
            <View style={[GlobalStyles.mb30]}>
              <Text
                category="h6"
                style={[GlobalStyles.mb10, GlobalStyles.fontBold]}>
                Rules and regulations
              </Text>
              <Text category="p2" style={{}}>
                {isShowMoreRules ? tempStr : trimString(tempStr, 150)}
              </Text>
              {!isShowMoreRules ? (
                <TouchableOpacity
                  style={styles.showMoreBtn}
                  activeOpacity={0.8}
                  onPress={() => setIsShowMoreRules(true)}>
                  <Text style={GlobalStyles.tAlignCenter} appearance="hint">
                    Show more
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
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
});

export default ContestDetails;
