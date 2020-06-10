import React, { useMemo } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    sideDrawer: {
      width: React.CSSProperties['width'];
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    sideDrawer?: {
      width?: React.CSSProperties['width'];
    };
  }
}

interface Props {
  themeMode: boolean;
  children: React.ReactNode;
}

const CustomTheme = ({ themeMode, children }: Props) => {
  const theme = useMemo(() => {
    return createMuiTheme({
      sideDrawer: {
        width: 240,
      },
      palette: {
        type: themeMode ? 'dark' : 'light',
        primary: {
          light: '#4c8c4a',
          main: '#1b5e20',
          dark: '#003300',
          contrastText: '#fff',
        },
        secondary: {
          light: '#6d6d6d',
          main: '#424242',
          dark: '#1b1b1b',
          contrastText: '#fff',
        },
      },
    });
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomTheme;
