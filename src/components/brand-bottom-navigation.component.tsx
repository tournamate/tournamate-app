import React, {useContext} from 'react';
import {
  BottomNavigation,
  BottomNavigationProps,
  ThemeProvider,
} from '@ui-kitten/components';
import {ThemeContext} from '../services/theme.service';
import {appThemes} from '../app/app-theming';

export const BrandBottomNavigation = (
  props: BottomNavigationProps,
): React.ReactElement => {
  const theming = useContext(ThemeContext);
  return (
    <ThemeProvider theme={appThemes.eva[theming.currentTheme]}>
      <BottomNavigation {...props} />
    </ThemeProvider>
  );
};
