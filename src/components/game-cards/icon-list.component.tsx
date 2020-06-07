import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {PriceTagLineIcon} from '../icons.component';
import {Text, Icon} from '@ui-kitten/components';
import {widthPercentageToDP} from '../../shared/methods/normalize';

export const IconList = ({icon, color, text}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        paddingTop: 40,
        width: widthPercentageToDP(30),
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: color,
          width: 50,
          height: 50,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Icon style={styles.icon} fill="#fff" name={icon} />
      </View>
      <Text style={{textAlign: 'center'}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
  },
  iconBlack: {
    backgroundColor: '#fff',
  },
});
