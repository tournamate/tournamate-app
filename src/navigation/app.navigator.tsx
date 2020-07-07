import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './auth.navigator';
import {useSelector} from 'react-redux';
import {AuthSchema} from '../models/user.models';
import {HomeNavigator} from './home.navigator';

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

interface RouteProps {}

export const AppNavigator = (): React.ReactElement<RouteProps> => {
  const authData = useSelector((state: {auth: AuthSchema}) => state.auth);
  return (
    <NavigationContainer theme={navigatorTheme}>
      {authData.isAuthenticated ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
