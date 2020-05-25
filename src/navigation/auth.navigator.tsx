import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screens/auth/intro/Intro';
import Welcome from '../screens/auth/welcome/Welcome';
import {RouterConstants} from '../constants/router.constants';
import Signin from '../screens/auth/sigin/Signin';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={RouterConstants.IntroScreenOne} component={Intro} />
    <Stack.Screen name={RouterConstants.WelcomeScreen} component={Welcome} />
    <Stack.Screen name={RouterConstants.Signin} component={Signin} />
  </Stack.Navigator>
);
