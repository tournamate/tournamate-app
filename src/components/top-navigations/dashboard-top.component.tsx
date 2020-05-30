import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  IconProps,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const MenuIcon = (props: IconProps) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props: IconProps) => <Icon {...props} name="info" />;

const LogoutIcon = (props: IconProps) => <Icon {...props} name="log-out" />;

export const DashboardTopNav = ({
  name,
  photoUrl,
  onPressPhoto,
}: {
  name: string;
  photoUrl: string;
  onPressPhoto: () => void;
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props: any) => (
    <TouchableOpacity
      style={styles.titleContainer}
      activeOpacity={0.7}
      onPress={onPressPhoto}>
      <Avatar style={styles.logo} source={{uri: photoUrl}} />
      <Text {...props}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
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
});
