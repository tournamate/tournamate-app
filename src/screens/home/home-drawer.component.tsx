import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  // Avatar,
  // Divider,
  Drawer,
  DrawerElement,
  DrawerItem,
  //   DrawerHeaderElement,
  //   DrawerHeaderFooter,
  //   DrawerHeaderFooterElement,
  // Layout,
  // MenuItemType,
  Text,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
// import {WebBrowserService} from '../../services/web-browser.service';
import {AppInfoService} from '../../services/app-info.service';
import {FacebookIcon, GoogleIcon} from '../../components/icons.component';

const DATA: any = [
  {title: 'Libraries', icon: FacebookIcon},
  {title: 'Documentation', icon: GoogleIcon},
];

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({navigation}): DrawerElement => {
  //   const onItemSelect = (index: number): void => {
  //     switch (index) {
  //       case 0: {
  //         navigation.toggleDrawer();
  //         navigation.navigate('Libraries');
  //         return;
  //       }
  //       case 1: {
  //         WebBrowserService.openBrowserAsync(
  //           'https://akveo.github.io/react-native-ui-kitten',
  //         );
  //         navigation.toggleDrawer();
  //         return;
  //       }
  //     }
  //   };

  //   const renderHeader = (): DrawerHeaderElement => (
  //     <Layout style={styles.header} level="2">
  //       <View style={styles.profileContainer}>
  //         <Avatar
  //           size="giant"
  //           source={require('../../assets/images/penguine-image.svg')}
  //         />
  //         <Text style={styles.profileName} category="h6">
  //           Kitten Tricks
  //         </Text>
  //       </View>
  //     </Layout>
  //   );

  //   const renderFooter = (): DrawerHeaderFooterElement => (
  //     <React.Fragment>
  //       <Divider />
  //       <DrawerHeaderFooter
  //         disabled={true}
  //         description={`Version ${AppInfoService.getVersion()}`}
  //       />
  //     </React.Fragment>
  //   );
  const renderDrawerItems = (): React.ReactElement =>
    DATA.map((item) => (
      <DrawerItem title={item.title} accessoryLeft={item.icon} />
    ));
  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Drawer
        header={() => (
          <View>
            <Text>Header</Text>
          </View>
        )}
        footer={() => (
          <View>
            <Text>Footer</Text>
          </View>
        )}
        onSelect={(index) => console.log(index)}>
        {renderDrawerItems()}
      </Drawer>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
