import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Provider component that wraps your app
export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // Default to dark mode
  });

  // Update the theme in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme class to the document body
    document.body.className = theme;
    
    // You can also set a data attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Make all pages start with dark theme on first load
  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};