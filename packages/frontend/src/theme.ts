import { createTheme } from '@mui/material/styles';

/**
 * Custom theme for JustInCase
 * Fresh purple (lila) and pink (rosa) color palette
 * Subtle and elegant design
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Purple
      light: '#e1bee7', // Light purple
      dark: '#6a1b9a', // Dark purple
    },
    secondary: {
      main: '#e91e63', // Pink
      light: '#f8bbd0', // Light pink
      dark: '#ad1457', // Dark pink
    },
    background: {
      default: '#fafafa', // Very light gray
      paper: '#ffffff',
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
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#6a1b9a',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#6a1b9a',
    },
    h6: {
      fontWeight: 600,
    },
  },
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
          background: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7b1fa2 0%, #c2185b 100%)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            opacity: 0.8,
          },
        },
      },
    },
  },
});
