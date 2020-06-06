import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/core';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawer} from '../screens/home/home-drawer.component';
import {HomeBottomNavigation} from '../screens/home/home-bottom-navigation.component';
import {RouterConstants} from '../constants/router.constants';
import Dashboard from '../screens/dashboard/dashboard.screen';
import Account from '../screens/account/account.screen';
import Matches from '../screens/matches/matches.screen';
import Notifications from '../screens/notifications/notifications.screen';
import DetailedCards from '../screens/detailed-cards/detailed-cards.screen';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// const BackAction = () => <TopNavigationAction icon={FacebookIcon} />;

const ROOT_ROUTES: string[] = [
  'Dashboard',
  'Matches',
  'Notifications',
  'Account',
];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find((route) => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({
  route,
}: any): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return {tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute)};
};

export const HomeTabsNavigator = () => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    tabBar={(props) => <HomeBottomNavigation {...props} />}>
    <BottomTab.Screen name={RouterConstants.Dashboard} component={Dashboard} />
    <BottomTab.Screen name={RouterConstants.Matches} component={Matches} />
    <BottomTab.Screen
      name={RouterConstants.Notifications}
      component={Notifications}
    />
    <BottomTab.Screen name={RouterConstants.Account} component={Account} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator drawerContent={(props) => <HomeDrawer {...props} />}>
    <Drawer.Screen name={RouterConstants.Home} component={HomeTabsNavigator} />
    <Drawer.Screen name={RouterConstants.Account} component={Account} />
    <Drawer.Screen name={RouterConstants.Matches} component={Matches} />
    <Drawer.Screen
      name={RouterConstants.Notifications}
      component={Notifications}
    />
    <Drawer.Screen
      name={RouterConstants.DetailedCards}
      component={DetailedCards}
    />
  </Drawer.Navigator>
);
