import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Navigation = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          {t('components.navigation.brand')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <MuiLink
            href="/"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            {t('components.navigation.home')}
          </MuiLink>
          <MuiLink
            href="/items"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            {t('components.navigation.items')}
          </MuiLink>
          <MuiLink
            href="/settings"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            {t('components.navigation.settings')}
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
