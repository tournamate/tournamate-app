import React from 'react';
import {ViewProps, View, TouchableOpacity} from 'react-native';
import {
  Divider,
  DrawerElement,
  DrawerItem,
  IndexPath,
  Layout,
  Text,
  Drawer,
  Icon,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import {AppInfoService} from '../../services/app-info.service';
import {ImageOverlay} from '../../components/image-overlay.component';
import {FacebookIcon, LogoutIcon} from '../../components/icons.component';
import {ThemeContext} from '../../services/theme.service';
import AuthService from '../../services/auth.service';

export const HomeDrawer = ({navigation, state}: any): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    new IndexPath(state.index),
  );
  const themeService = React.useContext(ThemeContext);
  const onHomeItemPress = ({index}: any): void => {
    navigation.navigate('Home');
    setSelectedIndex(index);
  };
  const onLogoutPress = async () => {
    await AuthService.signOut();
  };

  const styles = useStyleSheet(themedStyles);
  const handleChangeTheme = () =>
    themeService.setCurrentTheme(themeService.isDarkMode ? 'light' : 'dark');

  const renderHeader = (props: ViewProps): React.ReactElement => (
    <React.Fragment>
      <ImageOverlay
        style={[styles.header, props.style]}
        source={require('../../assets/images/image-app-icon.png')}>
        <View style={styles.themeIcon}>
          <TouchableOpacity onPress={handleChangeTheme}>
            <Icon
              name="moon"
              style={styles.themeMoonIcon}
              fill={styles.themeMoon.backgroundColor}
            />
          </TouchableOpacity>
        </View>
      </ImageOverlay>
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
        title="Logout"
        accessoryLeft={LogoutIcon}
        onPress={onLogoutPress}
      />
    </Drawer>
  );
};

const themedStyles = StyleService.create({
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 52,
    height: 52,
    backgroundColor: 'background-basic-color-1',
    borderRadius: 40,
  },
  themeMoonIcon: {
    width: 52,
    height: 52,
  },
  themeMoon: {
    backgroundColor: 'color-primary-500',
  },
});
