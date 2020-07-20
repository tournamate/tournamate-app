import React from 'react';
import {View, Image} from 'react-native';
import {Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import {GlobalStyles} from '../constants/global-styles';
import {ArrowForwardIcon} from './icons.component';
import {RateBar} from './rate-bar.component';
import {widthPercentageToDP} from '../shared/methods/normalize';

const UserPreview = ({
  profileUrl,
  profileName,
  userName,
}: {
  profileUrl: string;
  profileName: string;
  userName: string;
}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <>
      <View style={[GlobalStyles.flexRowWrap1, GlobalStyles.mb15]}>
        <View style={GlobalStyles.flexRowWrap2}>
          <Image
            source={{
              uri:
                profileUrl ||
                'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
            }}
            style={styles.profileImage as any}
          />
          <View style={GlobalStyles.mb15}>
            <Text category="h5">{profileName.substr(0, 25)}</Text>
            <Text category="p2" status="basic">
              {userName}
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
      {/* <View style={styles.cardContainer}>
        {[
          {title: 'Matches organized', subText: '20'},
          {title: 'Money Earned', subText: '₹1,000‎'},
          {title: 'Matches Won', subText: '20'},
        ].map((item) => (
          <View style={styles.cardItem}>
            <Text status="basic" style={GlobalStyles.fontBold} category="h6">
              {item.subText}
            </Text>
            <Text status="basic" style={GlobalStyles.tAlignCenter}>
              {item.title}
            </Text>
          </View>
        ))}
      </View> */}
    </>
  );
};

export default UserPreview;

const themedStyles = StyleService.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  iconColor: {
    backgroundColor: 'text-basic-color',
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
