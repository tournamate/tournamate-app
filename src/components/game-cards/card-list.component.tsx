import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  SCREEN_WIDTH,
} from '../../shared/methods/normalize';
import {Text, Button, StyleService, useStyleSheet} from '@ui-kitten/components';
import {trimString} from '../../shared/methods/trimString';
import {
  ClockLineIcon,
  PersonLineIcon,
  PeopleLineIcon,
  PriceTagLineIcon,
} from '../icons.component';

const CardInList = ({
  entryPrice,
  title,
  //   timing,
  participants,
  organizer,
  tags,
  index,
  detailedCard,
}: {
  entryPrice: number;
  title: string;
  timing: object;
  participants: {total: number; joined: number};
  organizer: string;
  tags: string[];
  index: number;
  detailedCard?: boolean;
}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View
      style={[
        styles.container,
        index === 0 && !detailedCard && styles.ml20,
        detailedCard && {
          marginBottom: 15,
        },
      ]}>
      <View
        style={[
          detailedCard && {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: widthPercentageToDP(100),
            justifyContent: 'center',
            alignContent: 'center',
          },
        ]}>
        <View
          style={[
            detailedCard && {marginRight: 15, width: widthPercentageToDP(32)},
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[detailedCard && {flexDirection: 'row'}]}>
            <Image
              source={{
                uri:
                  'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
              }}
              style={[
                styles.image as any,
                detailedCard && styles.detailedImage,
                {width: '100%'},
              ]}
            />
            {detailedCard ? null : (
              <View style={[styles.priceText, styles.flexRow]}>
                <Text category="s2" style={styles.colorBlack}>
                  ₹{entryPrice}/entry
                </Text>
                <PriceTagLineIcon
                  style={styles.icon}
                  fill={styles.iconBlack.backgroundColor}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={detailedCard && {width: widthPercentageToDP(60)}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={[
                !detailedCard && styles.cardTitle,
                // detailedCard && {width: '63%'},
              ]}
              category={detailedCard ? 'h6' : 'p1'}>
              {detailedCard ? trimString(title, 50) : trimString(title, 30)}
            </Text>
          </View>
          <View style={[styles.flexRow, {flexWrap: 'wrap'}]}>
            <View style={[styles.flexRow, {marginRight: 10}]}>
              <ClockLineIcon
                style={styles.icon}
                fill={styles.iconColor.backgroundColor}
              />
              <Text category="label" style={styles.ml12}>
                Today 12PM
              </Text>
            </View>
            <View style={styles.flexRow}>
              <PeopleLineIcon
                style={styles.icon}
                fill={styles.iconColor.backgroundColor}
              />
              <Text category="label" style={styles.ml12}>
                {participants.joined}/{participants.total}
              </Text>
            </View>
            <View style={[styles.flexRow, styles.aiCenter, {marginBottom: 5}]}>
              <PersonLineIcon
                style={styles.icon}
                fill={styles.iconColor.backgroundColor}
              />
              <Button appearance="ghost" size="small" status="basic">
                {organizer}
              </Button>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            {detailedCard && (
              <>
                <Button
                  size="tiny"
                  style={styles.tagBtn}
                  // appearance="outline"
                  status="warning">
                  {`₹${entryPrice}/entry`}
                </Button>
                <Button
                  size="tiny"
                  style={styles.tagBtn}
                  // appearance="outline"
                  status="danger">
                  Hot 🔥
                </Button>
              </>
            )}
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
  cardTitle: {width: widthPercentageToDP(35), marginBottom: 5},
  tagWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  tagBtn: {marginRight: 5, marginBottom: 5, height: 10},
  orgText: {marginBottom: 10},
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  iconColor: {
    backgroundColor: 'text-basic-color',
  },
  flexRow: {
    flexDirection: 'row',
  },
  ml12: {
    marginLeft: 12,
  },
  colorBlack: {
    color: '#000',
  },
  iconBlack: {
    backgroundColor: '#000',
  },
  aiCenter: {alignItems: 'center'},
  ml20: {
    marginLeft: 20,
  },
});
