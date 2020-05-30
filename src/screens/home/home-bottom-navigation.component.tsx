import React from 'react';
import {
  BottomNavigationTab,
  Divider,
  BottomNavigation,
  Icon,
} from '@ui-kitten/components';
import {
  HomeLineIcon,
  BellLineIcon,
  SmartPhoneLineIcon,
} from '../../components/icons.component';

export const HomeBottomNavigation = (props: any): React.ReactElement => {
  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  React.useEffect(() => {
    flashIconRef?.current?.startAnimation();
  }, []);
  const flashIconRef = React.useRef<any>();
  const FlashLineIcon = (style: any) => (
    <Icon
      {...style}
      name="flash-outline"
      ref={flashIconRef}
      animation="shake"
      animationConfig={{cycles: Infinity}}
    />
  );

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
