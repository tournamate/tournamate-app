import React from 'react';
import {RouteProp} from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeBottomNavigation} from '../screens/home/home-bottom-navigation.component';
import {HomeDrawer} from '../scenes/home/home-drawer.component';
import {LibrariesScreen} from '../scenes/libraries/libraries.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Components' : 'Layouts';

/*
 * Can we access it from `HomeNavigator`?
 */
const ROOT_ROUTES: string[] = ['Home', 'Layouts', 'Components', 'Themes'];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find((route) => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({
  route,
}): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return {tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute)};
};

const LayoutsNavigator = () => (
  <View>
    <Text>Layout Navigators</Text>
  </View>
);
const ComponentsNavigator = () => (
  <View>
    <Text>Components Navigators</Text>
  </View>
);
const ThemesNavigator = () => (
  <View>
    <Text>Themes Navigator</Text>
  </View>
);

const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={initialTabRoute}
    tabBar={(props) => <HomeBottomNavigation {...props} />}>
    <BottomTab.Screen name="Layouts" component={LayoutsNavigator} />
    <BottomTab.Screen name="Components" component={ComponentsNavigator} />
    <BottomTab.Screen name="Themes" component={ThemesNavigator} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{gestureEnabled: false}}
    drawerContent={(props) => <HomeDrawer {...props} />}>
    <Drawer.Screen name="Home" component={HomeTabsNavigator} />
    <Drawer.Screen name="Libraries" component={LibrariesScreen} />
  </Drawer.Navigator>
);
