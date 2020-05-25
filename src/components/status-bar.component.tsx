import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

const TMStatusBar = (props: StatusBarProps): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const properties: StatusBarProps = {
    backgroundColor: styles.statusBar.backgroundColor,
    barStyle: 'default',
    translucent: false,
  };
  if (props.backgroundColor) {
    properties.backgroundColor = props.backgroundColor;
  }
  if (props.barStyle) {
    properties.barStyle = props.barStyle;
  }
  if (props.translucent) {
    properties.translucent = props.translucent;
  }
  console.log(styles.statusBar);
  return <StatusBar {...properties} />;
};

const themedStyles = StyleService.create({
  statusBar: {
    backgroundColor: 'background-basic-color-2',
  },
});

export default TMStatusBar;
