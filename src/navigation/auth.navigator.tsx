import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screens/auth/intro/Intro';
import Welcome from '../screens/auth/welcome/Welcome';
import {RouterConstants} from '../constants/router.constants';
import Signup from '../screens/auth/signup/Signup';
import SocialLogin from '../screens/auth/social-signin/social-sigin.screen';
import ForgotPassword from '../screens/auth/forgot-password/forgot-password.screen';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none" initialRouteName="Intro">
    <Stack.Screen name={RouterConstants.IntroScreenOne} component={Intro} />
    <Stack.Screen name={RouterConstants.WelcomeScreen} component={Welcome} />
    <Stack.Screen name={RouterConstants.Signin} component={SocialLogin} />
    <Stack.Screen name={RouterConstants.Signup} component={Signup} />
    <Stack.Screen
      name={RouterConstants.ForgotPassword}
      component={ForgotPassword}
    />
  </Stack.Navigator>
);
