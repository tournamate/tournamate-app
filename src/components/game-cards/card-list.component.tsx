import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
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

const CardInList = ({
  entryPrice,
  title,
  //   timing,
  participants,
  organizer,
  tags,
  index,
}: {
  entryPrice: number;
  title: string;
  timing: object;
  participants: {total: number; joined: number};
  organizer: string;
  tags: string[];
  index: number;
}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, index === 0 && {marginLeft: 20}]}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image
          source={{
            uri:
              'https://2.bp.blogspot.com/-OVduoXsA4qM/XJRu-xgsy0I/AAAAAAAAm6k/oBSVkinse_o1KESQpzCC0UyoEBCkYEvtgCLcBGAs/s1600/PUBG-HD-Wallpapers-1.jpg',
          }}
          style={styles.image as any}
        />
        <View style={[styles.priceText, {flexDirection: 'row'}]}>
          <Text category="s2" style={{color: '#000'}}>
            ₹{entryPrice}/entry
          </Text>
          <PriceTagLineIcon
            style={{width: 15, height: 15, marginRight: 5}}
            fill={'#000'}
          />
        </View>

        <Text style={styles.cardTitle} category="p1">
          {trimString(title, 30)}
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <ClockLineIcon
          style={{width: 15, height: 15, marginRight: 5}}
          fill={'#000'}
        />
        <Text category="label">Today 12PM</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <PeopleLineIcon
          style={{width: 15, height: 15, marginRight: 5}}
          fill={'#000'}
        />
        <Text category="label">
          Players: {participants.joined}/{participants.total}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <PersonLineIcon
          style={{width: 15, height: 15, marginRight: 5}}
          fill={'#000'}
        />
        <Text category="label" style={styles.orgText}>
          Org: {organizer}
        </Text>
      </View>
      <View style={styles.tagWrap}>
        {tags.map((tag) => (
          <Button size="tiny" style={styles.tagBtn} appearance="outline">
            {tag}
          </Button>
        ))}
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
  priceText: {
    position: 'absolute',
    right: 0,
    top: 20,
    backgroundColor: 'color-success-300',
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
});
