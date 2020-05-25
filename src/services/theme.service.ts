import {createContext} from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: 'light',
  setCurrentTheme: (theme) => theme,
  isDarkMode: false,
});
