import * as eva from '@eva-design/eva';
import {default as appTheme} from './app-theme.json';

export const appThemes = {
  eva: {
    light: {...eva.light, ...appTheme},
    dark: {...eva.dark, ...appTheme},
  },
};
