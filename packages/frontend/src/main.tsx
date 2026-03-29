import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {CssBaseline, ThemeProvider} from '@mui/material';
import 'src/i18n/config';
import './index.css';
import {theme} from 'src/theme';
import App from 'src/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
