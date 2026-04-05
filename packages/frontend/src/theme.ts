import {createTheme} from '@mui/material/styles';

/**
 * Custom theme for JustInCase
 * Fresh purple (lila) and pink (rosa) color palette
 * Subtle and elegant design
 */
export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
          boxShadow: '0 2px 8px rgba(156, 39, 176, 0.15)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:hover': {
            background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
          },
          background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            opacity: 0.8,
          },
          color: '#ffffff',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#fafafa', // Very light gray
      paper: '#ffffff',
    },
    primary: {
      dark: '#6a1b9a', // Dark purple
      light: '#e1bee7', // Light purple
      main: '#9c27b0', // Purple
    },
    secondary: {
      dark: '#ad1457', // Dark pink
      light: '#f8bbd0', // Light pink
      main: '#e91e63', // Pink
    },
    text: {
      primary: '#424242',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      color: '#6a1b9a',
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      color: '#6a1b9a',
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});
