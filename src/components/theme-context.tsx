import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  background: string;
  text: string;
}

interface Themes {
  admin: Theme;
  user: Theme;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (type: keyof Themes) => void;
}

const themes: Themes = {
  admin: {
    background: 'bg-red-500',
    text: 'text-red-500',
  },
  user: {
    background: 'bg-blue-500',
    text: 'text-blue-500',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<keyof Themes>('user');

  const value: ThemeContextType = {
    theme: themes[theme],
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
