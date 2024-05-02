import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './config/theme';

function ThemeProviderWithScheme({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProviderWithScheme>
      <App />
    </ThemeProviderWithScheme>
  </React.StrictMode>
);

