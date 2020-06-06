import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Avatar,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {MenuIcon} from '../icons.component';

export const DashboardTopNav = ({
  name,
  photoUrl,
  onPressPhoto,
  navigation,
}: {
  name: string;
  photoUrl: string;
  onPressPhoto: () => void;
  navigation: {toggleDrawer: () => any};
}) => {
  const renderTitle = (props: any) => (
    <TouchableOpacity
      style={styles.titleContainer}
      activeOpacity={0.7}
      onPress={onPressPhoto}>
      <View>
        <Text style={styles.tAlignRight}>Welcome!</Text>
        <Text style={styles.tAlignRight} {...props}>
          {name.split(' ')[0]}
        </Text>
      </View>
      <Avatar style={styles.logo} source={{uri: photoUrl}} />
    </TouchableOpacity>
  );

  const renderLeftIcon = () => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.toggleDrawer} />
  );

  return (
    <TopNavigation
      //   title={renderTitle}
      accessoryLeft={renderLeftIcon}
      accessoryRight={renderTitle}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16,
  },
  tAlignRight: {
    textAlign: 'right',
  },
});
