import React, {useState} from 'react';
import 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-community/google-signin';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';

import {
  ThemeContext,
  ThemeContextValue,
  Theme,
} from '../services/theme.service';
import {AppStorage} from '../services/app-storage.service';
import {appThemes} from './app-theming';
import * as mapping from './app-mapping.json';
import {AppNavigator} from '../navigation/app.navigator';
import StatusBar from '../components/status-bar.component';
import {persistedStore, store} from '../store/configureStore';
import {AppConfig} from '../../app.config';

const App = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const themeValue: ThemeContextValue = {
    currentTheme: theme,
    setCurrentTheme: (nextTheme) => {
      setTheme(nextTheme);
      AppStorage.setValue('theme', theme);
    },
    isDarkMode: theme === 'dark' ? true : false,
  };

  React.useEffect(() => {
    SplashScreen.hide();
    GoogleSignin.configure({
      webClientId: AppConfig.webClientId,
    });
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        Toast.show('You are online!');
      } else {
        Toast.show('You are offline!');
      }
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    return unsubscribe;
  }, []);

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={eva.mapping}
        theme={appThemes.eva[theme]}
        customMapping={mapping as any}>
        <ThemeContext.Provider value={themeValue}>
          <SafeAreaProvider>
            <StatusBar />
            <Provider store={store}>
              <PersistGate
                // loading={<Splash />}
                persistor={persistedStore}>
                <AppNavigator />
              </PersistGate>
            </Provider>
          </SafeAreaProvider>
        </ThemeContext.Provider>
      </ApplicationProvider>
    </React.Fragment>
  );
};

export default App;

// Use this code for status bar transparent with dark-content
// <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />;
