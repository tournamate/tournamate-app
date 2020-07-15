import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/core';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawer} from '../screens/home/home-drawer.component';
import {HomeBottomNavigation} from '../screens/home/home-bottom-navigation.component';
import Dashboard from '../screens/dashboard/dashboard.screen';
import Account from '../screens/account/account.screen';
import Matches from '../screens/matches/matches.screen';
import Notifications from '../screens/notifications/notifications.screen';
import DetailedCards from '../screens/detailed-cards/detailed-cards.screen';
import OrganizeContest from '../screens/organize-contest/organize-contest.screen';
import ContestDetails from '../screens/contest-details/contest-details.screen';
import PrizeLeaderBoard from '../screens/prize-leaderboard/prize-leaderboard.screen';
import UserProfile from '../screens/user-profile/user-profile.screen';
import {HomeTabsParamList, HomeDrawerParamList} from './navigation.types';
import EditProfile from '../screens/edit-profile/edit-profile.screen';

const BottomTab = createBottomTabNavigator<HomeTabsParamList>();
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

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

export const HomeTabsNavigator: React.FC = () => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    tabBar={(props) => <HomeBottomNavigation {...props} />}>
    <BottomTab.Screen name={'Dashboard'} component={Dashboard} />
    <BottomTab.Screen name={'Matches'} component={Matches} />
    <BottomTab.Screen name={'Notifications'} component={Notifications} />
    <BottomTab.Screen name={'Account'} component={Account} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator drawerContent={(props) => <HomeDrawer {...props} />}>
    <Drawer.Screen name={'Home'} component={HomeTabsNavigator} />
    <Drawer.Screen name={'OrganizeContest'} component={OrganizeContest} />
    <Drawer.Screen name={'Dashboard'} component={Dashboard} />
    <Drawer.Screen name={'Account'} component={Account} />
    <Drawer.Screen name={'Matches'} component={Matches} />
    <Drawer.Screen name={'Notifications'} component={Notifications} />
    <Drawer.Screen name={'DetailedCards'} component={DetailedCards} />
    <Drawer.Screen name={'ContestDetails'} component={ContestDetails} />
    <Drawer.Screen name={'PrizeLeaderboard'} component={PrizeLeaderBoard} />

    <Drawer.Screen name={'UserProfile'} component={UserProfile} />
    <Drawer.Screen name={'EditProfile'} component={EditProfile} />
  </Drawer.Navigator>
);
