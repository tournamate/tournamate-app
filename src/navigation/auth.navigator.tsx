import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screens/auth/intro/Intro';
import Welcome from '../screens/auth/welcome/Welcome';
import SocialLogin from '../screens/auth/social-signin/social-sigin.screen';
import {AuthParamList} from './navigation.types';

const Stack = createStackNavigator<AuthParamList>();
interface AuthProps {}
export const AuthNavigator = (): React.ReactElement<AuthProps> => (
  <Stack.Navigator headerMode="none" initialRouteName="IntroScreenOne">
    <Stack.Screen name={'IntroScreenOne'} component={Intro} />
    <Stack.Screen name={'WelcomeScreen'} component={Welcome} />
    <Stack.Screen name={'SocialSignin'} component={SocialLogin} />
  </Stack.Navigator>
);
