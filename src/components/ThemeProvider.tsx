import React, { useEffect, useState } from 'react';
import { ThemeContext, Theme } from './ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'theme1';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
