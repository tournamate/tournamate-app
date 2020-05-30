import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {
  Divider,
  DrawerElement,
  DrawerGroup,
  DrawerItem,
  IndexPath,
  Layout,
  Text,
  Drawer,
} from '@ui-kitten/components';
import {WebBrowserService} from '../../services/web-browser.service';
import {AppInfoService} from '../../services/app-info.service';
import {ImageOverlay} from '../../components/image-overlay.component';
import {FacebookIcon} from '../../components/icons.component';

export const HomeDrawer = ({navigation, state}): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    new IndexPath(state.index),
  );

  const onHomeItemPress = ({index}): void => {
    navigation.navigate('Home');
    setSelectedIndex(index);
  };

  const onLibrariesItemPress = ({index}): void => {
    navigation.navigate('Libraries');
    setSelectedIndex(index);
  };

  const onDocumentationItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://hubs.ly/H0n7b4L0');
    navigation.toggleDrawer();
  };

  const onBundlesItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://hubs.ly/H0n79BR0');
    navigation.toggleDrawer();
  };

  const onEvaDesignItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://hubs.ly/H0n79zV0');
    navigation.toggleDrawer();
  };

  const onEvaIconsItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://akveo.github.io/eva-icons');
    navigation.toggleDrawer();
  };

  const onNebularItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://akveo.github.io/nebular');
    navigation.toggleDrawer();
  };

  const onNGXAdminItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://akveo.github.io/ngx-admin');
    navigation.toggleDrawer();
  };

  const onUIBakeryItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://uibakery.io');
    navigation.toggleDrawer();
  };

  const onTwitterItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://twitter.com/akveo_inc');
    navigation.toggleDrawer();
  };

  const onFacebookItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://www.facebook.com/akveo');
    navigation.toggleDrawer();
  };

  const onMediumItemPress = (): void => {
    WebBrowserService.openBrowserAsync('https://medium.com/akveo-engineering');
    navigation.toggleDrawer();
  };

  const renderHeader = (props: ViewProps): React.ReactElement => (
    <React.Fragment>
      <ImageOverlay
        style={[styles.header, props.style]}
        source={require('../../assets/images/image-app-icon.png')}
      />
      <Divider />
    </React.Fragment>
  );

  const renderFooter = (props: ViewProps): React.ReactElement => (
    <React.Fragment>
      <Divider />
      <Layout {...props}>
        <Text appearance="hint" category="c1">
          {`Version ${AppInfoService.getVersion()}`}
        </Text>
      </Layout>
    </React.Fragment>
  );

  return (
    <Drawer
      selectedIndex={selectedIndex}
      header={renderHeader as any}
      footer={renderFooter as any}>
      <DrawerItem
        title="Home"
        accessoryLeft={FacebookIcon}
        onPress={onHomeItemPress}
      />
      <DrawerItem
        title="Libraries"
        accessoryLeft={FacebookIcon}
        onPress={onLibrariesItemPress}
      />
      <DrawerItem
        title="Documentation"
        accessoryLeft={FacebookIcon}
        onPress={onDocumentationItemPress}
      />
      <DrawerGroup title="More from Akveo" accessoryLeft={FacebookIcon}>
        <DrawerItem
          title="UI Kitten"
          accessoryLeft={FacebookIcon}
          onPress={onDocumentationItemPress}
        />
        <DrawerItem
          title="UI Kitten Bundles"
          accessoryLeft={FacebookIcon}
          onPress={onBundlesItemPress}
        />
        <DrawerItem
          title="Eva Design System"
          accessoryLeft={FacebookIcon}
          onPress={onEvaDesignItemPress}
        />
        <DrawerItem
          title="Eva Icons"
          accessoryLeft={FacebookIcon}
          onPress={onEvaIconsItemPress}
        />
        <DrawerItem
          title="Nebular"
          accessoryLeft={FacebookIcon}
          onPress={onNebularItemPress}
        />
        <DrawerItem
          title="ngx-admin"
          accessoryLeft={FacebookIcon}
          onPress={onNGXAdminItemPress}
        />
        <DrawerItem
          title="UI Bakery"
          accessoryLeft={FacebookIcon}
          onPress={onUIBakeryItemPress}
        />
      </DrawerGroup>
      <DrawerGroup title="Socials" accessoryLeft={FacebookIcon}>
        <DrawerItem
          title="Twitter"
          accessoryLeft={FacebookIcon}
          onPress={onTwitterItemPress}
        />
        <DrawerItem
          title="Facebook"
          accessoryLeft={FacebookIcon}
          onPress={onFacebookItemPress}
        />
        <DrawerItem
          title="Medium"
          accessoryLeft={FacebookIcon}
          onPress={onMediumItemPress}
        />
      </DrawerGroup>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginHorizontal: 8,
  },
  versionText: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
