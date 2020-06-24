import React from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../shared/methods/normalize';
import {Text, Button, StyleService, useStyleSheet} from '@ui-kitten/components';
import {trimString} from '../../shared/methods/trimString';
import {
  ClockLineIcon,
  PersonLineIcon,
  PeopleLineIcon,
  PriceTagLineIcon,
} from '../icons.component';
import {
  GlobalStyles as gStyles,
  GlobalStyles,
} from '../../constants/global-styles';

const CardInList = ({
  entryPrice,
  title,
  //   timing,
  participants,
  organizer,
  tags,
  index,
  detailedCard,
  onPress,
}: {
  entryPrice: number;
  title: string;
  timing: object;
  participants: {total: number; joined: number};
  organizer: string;
  tags: string[];
  index: number;
  detailedCard?: boolean;
  onPress: () => void;
}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View
      style={[
        styles.container,
        index === 0 && !detailedCard && gStyles.ml20,
        detailedCard && gStyles.mb15,
      ]}>
      <View style={[detailedCard && styles.detailedCardWrapper]}>
        <View
          style={[
            detailedCard && [gStyles.mr15, styles.detailedCardLeftWidth],
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[detailedCard && gStyles.flexRow]}
            onPress={onPress}>
            <ImageBackground
              source={{
                uri:
                  'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
              }}
              style={[
                styles.image as any,
                detailedCard && styles.detailedImage,
                gStyles.w100,
              ]}
              imageStyle={
                detailedCard ? (styles.br15 as any) : (styles.br25 as any)
              }>
              <View
                style={[
                  styles.priceText,
                  detailedCard && styles.detailedCardPrice,
                  gStyles.flexRow,
                ]}>
                <Text
                  category="s2"
                  style={[styles.colorBlack, GlobalStyles.tAlignCenter]}>
                  ₹{entryPrice}/entry
                </Text>
                <PriceTagLineIcon
                  style={styles.icon}
                  fill={styles.iconBlack.backgroundColor}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={detailedCard && styles.detailedCardRightWidth}>
          <View style={[gStyles.flexRowWrap1, gStyles.mb10]}>
            <Text
              style={[!detailedCard && styles.cardTitle]}
              category={detailedCard ? 'h6' : 'p1'}>
              {detailedCard ? trimString(title, 50) : trimString(title, 30)}
            </Text>
          </View>
          <View style={[gStyles.flexRow, gStyles.flexWrap]}>
            <View style={[gStyles.flexRow, gStyles.mr10]}>
              <ClockLineIcon
                style={styles.icon}
                fill={styles.iconColor.backgroundColor}
              />
              <Text category="label" style={gStyles.ml12}>
                Today 12PM
              </Text>
            </View>
            <View style={gStyles.flexRow}>
              <PeopleLineIcon
                style={styles.icon}
                fill={styles.iconColor.backgroundColor}
              />
              <Text category="label" style={gStyles.ml12}>
                {participants.joined}/{participants.total}
              </Text>
            </View>
            <View style={[gStyles.flexRow, gStyles.aiCenter]}>
              <PersonLineIcon
                style={styles.icon}
                fill={styles.iconColor.backgroundColor}
              />
              <Button appearance="ghost" size="small" status="basic">
                {organizer}
              </Button>
            </View>
          </View>
          <View style={styles.tagWrap}>
            {tags.map((tag) => (
              <Button
                size="tiny"
                style={styles.tagBtn}
                appearance="outline"
                status="success">
                {tag}
              </Button>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardInList;

const themedStyles = StyleService.create({
  container: {width: widthPercentageToDP(35), marginRight: 15},
  detailedCardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: widthPercentageToDP(100),
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: widthPercentageToDP(35),
    height: heightPercentageToDP(17),
    borderRadius: 25,
    marginBottom: 5,
  },
  detailedImage: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(25),
    borderRadius: 15,
    marginBottom: 5,
  },
  br15: {
    borderRadius: 15,
  },
  br25: {
    borderRadius: 25,
  },
  priceText: {
    position: 'absolute',
    right: 0,
    top: 20,
    backgroundColor: 'color-warning-300',
    color: 'black',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
    alignItems: 'center',
  },
  detailedCardPrice: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'relative',
    justifyContent: 'center',
    top: 0,
  },
  cardTitle: {width: widthPercentageToDP(35), marginBottom: 5},
  tagWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  tagBtn: {marginRight: 5, marginBottom: 5, height: 10},
  detailedCardRightWidth: {width: widthPercentageToDP(60)},
  detailedCardLeftWidth: {width: widthPercentageToDP(32)},
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  iconColor: {
    backgroundColor: 'text-basic-color',
  },
  colorBlack: {
    color: '#000',
  },
  iconBlack: {
    backgroundColor: '#000',
  },
});
