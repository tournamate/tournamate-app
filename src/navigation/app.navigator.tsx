import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './auth.navigator';
import {useSelector} from 'react-redux';
import {AuthSchema} from '../models/user.models';

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

export const AppNavigator = (): React.ReactElement => {
  const authData = useSelector((state: {auth: AuthSchema}) => state.auth);
  return (
    <NavigationContainer theme={navigatorTheme}>
      {authData.isAuthenticated ? null : <AuthNavigator />}
    </NavigationContainer>
  );
};
