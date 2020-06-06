import React from 'react';
import {
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  MenuGroup,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {
  ArrowBackIcon,
  FlipIcon,
  ClockLineIcon,
  PriceTagLineIcon,
  PeopleLineIcon,
  FunnelLineIcon,
} from '../icons.component';

export const DetailedCardsNav = ({navigation}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={FlipIcon} onPress={toggleMenu} />
  );

  const handleBackPress = () => {
    navigation?.goBack();
  };

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={FunnelLineIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
        onSelect={(index) => {
          setMenuVisible(false);
          console.log(index);
        }}>
        <MenuGroup title="Sort by" accessoryLeft={FlipIcon}>
          <MenuItem title="Date" accessoryLeft={ClockLineIcon} />
          <MenuItem title="Entry Fee" accessoryLeft={PriceTagLineIcon} />
          <MenuItem title="Participants" accessoryLeft={PeopleLineIcon} />
        </MenuGroup>
        {/* <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" /> */}
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={handleBackPress} />
  );

  return (
    <TopNavigation
      alignment="center"
      title="Eva Application"
      //   subtitle="Subtitle"
      accessoryLeft={renderBackAction}
      accessoryRight={renderRightActions}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: 128,
  },
});
