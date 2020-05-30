import React from 'react';
import {
  BottomNavigationTab,
  Divider,
  BottomNavigation,
} from '@ui-kitten/components';
import {
  HomeLineIcon,
  FlashLineIcon,
  BellLineIcon,
  SmartPhoneLineIcon,
} from '../../components/icons.component';

export const HomeBottomNavigation = (props: any): React.ReactElement => {
  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <>
      <Divider />
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab title="Dashboard" icon={HomeLineIcon} />
        <BottomNavigationTab title="Matches" icon={FlashLineIcon} />
        <BottomNavigationTab title="Notifications" icon={BellLineIcon} />
        <BottomNavigationTab title="Account" icon={SmartPhoneLineIcon} />
      </BottomNavigation>
    </>
  );
};
