import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
export type AuthParamList = {
  IntroScreenOne: undefined;
  WelcomeScreen: undefined;
  SocialSignin: undefined;
};

export type HomeTabsParamList = {
  Dashboard: undefined;
  Notifications: undefined;
  Matches: undefined;
  Account: undefined;
};
export type HomeDrawerParamList = {
  Home: undefined;
  OrganizeContest: undefined;
  Matches: undefined;
  Account: undefined;
  Notifications: undefined;
  DetailedCards: undefined;
  ContestDetails: undefined;
  PrizeLeaderboard: undefined;
  UserProfile: undefined;
  Dashboard: undefined;
  EditProfile: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
export type HomeTabsNavProps<T extends keyof HomeTabsParamList> = {
  navigation: BottomTabNavigationProp<HomeTabsParamList, T>;
  route: RouteProp<HomeTabsParamList, T>;
};
export type HomeDrawerNavProps<T extends keyof HomeDrawerParamList> = {
  navigation: DrawerNavigationProp<HomeDrawerParamList, T>;
  route: RouteProp<HomeDrawerParamList, T>;
};
