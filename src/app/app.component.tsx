import React, {useState} from 'react';
import 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
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
// import {default as customMapping} from './app-mapping.json';
// import { default as mapping } from './mapping.json'; // <-- Import app mapping

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
            <AppNavigator />
          </SafeAreaProvider>
        </ThemeContext.Provider>
      </ApplicationProvider>
    </React.Fragment>
  );
};

export default App;

// Use this code for status bar transparent with dark-content
// <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />;
