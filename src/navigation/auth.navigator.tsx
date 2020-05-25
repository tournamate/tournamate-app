import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screens/auth/intro/Intro';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="IntroScreenOne" component={Intro} />
  </Stack.Navigator>
);
