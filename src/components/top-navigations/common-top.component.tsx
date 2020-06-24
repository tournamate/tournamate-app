import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ArrowBackIcon} from '../icons.component';

// const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const CommonTopNav = ({
  title,
  onPress,
  rightAction,
}: {
  title: string;
  onPress: () => void;
  rightAction?: () => any;
}) => {
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={onPress} />
  );
  return (
    <TopNavigation
      accessoryLeft={BackAction}
      title={title}
      accessoryRight={rightAction}
    />
  );
};
