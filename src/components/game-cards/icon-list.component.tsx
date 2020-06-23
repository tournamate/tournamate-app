import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Icon, StyleService, useStyleSheet} from '@ui-kitten/components';
import {widthPercentageToDP} from '../../shared/methods/normalize';
import {GlobalStyles} from '../../constants/global-styles';

export const IconList = ({
  icon,
  text,
  onPress,
}: {
  icon: string;
  text: string;
  onPress: () => void;
}) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.wrapper}
      onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Icon style={styles.icon} fill="#fff" name={icon} />
      </View>
      <Text style={GlobalStyles.tAlignCenter}>{text}</Text>
    </TouchableOpacity>
  );
};

const themedStyle = StyleService.create({
  icon: {
    width: 35,
    height: 35,
  },
  iconBlack: {
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingTop: 40,
    width: widthPercentageToDP(30),
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'color-primary-500',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
