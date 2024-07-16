import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Theme, Themes, UserType, themes } from './theme';
import useUser, { useUserType } from 'hooks/useUser';

interface ThemeContextType {
  theme: Theme;
  setTheme: (type: UserType) => void;
}

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
  const userType = useUserType() as UserType;
  const [theme, setTheme] = useState<UserType>(userType || 'moderator');
  console.log("Current theme is : ", theme, "but usertype is : ", userType);

  useEffect(() => {
    if (userType) {
      setTheme(userType);
    }
  }, [userType]);

  const value: ThemeContextType = {
    theme: themes[theme],
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
