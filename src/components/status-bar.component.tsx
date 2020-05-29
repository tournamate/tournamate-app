import React, {useContext} from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {ThemeContext} from '../services/theme.service';

const TMStatusBar = (props: StatusBarProps): React.ReactElement => {
  const theming = useContext(ThemeContext);

  const styles = useStyleSheet(themedStyles);
  const properties: StatusBarProps = {
    backgroundColor: styles.statusBar.backgroundColor,
    barStyle: theming.isDarkMode ? 'light-content' : 'dark-content',
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
  return <StatusBar {...properties} />;
};

const themedStyles = StyleService.create({
  statusBar: {
    backgroundColor: 'background-basic-color-2',
  },
});

export default TMStatusBar;
