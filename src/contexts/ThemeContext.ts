import { createContext, useContext } from 'react';

export type Theme = 'cupcake' | 'corporate' | 'winter' | 'dark' | 'bumblebee';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'winter',
  setTheme: () => {},
});