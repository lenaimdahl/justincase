import {AppBar, Toolbar, Typography, Box, Button, Link as MuiLink} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'src/contexts/AuthContext';

export const Navigation = () => {
  const {t} = useTranslation();
  const {isAuthenticated, logout, user} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
        <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
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
            href="/lists"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            {t('components.navigation.lists')}
          </MuiLink>
          {isAuthenticated && (
            <>
              {user?.username && (
                <Typography variant="body2" sx={{opacity: 0.8}}>
                  {user.username}
                </Typography>
              )}
              <Button color="inherit" onClick={handleLogout} size="small" variant="outlined">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
