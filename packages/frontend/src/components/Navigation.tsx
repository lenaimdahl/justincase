import {useState} from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'src/contexts/AuthContext';

export const Navigation = () => {
  const {t} = useTranslation();
  const {isAuthenticated, logout, user} = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigationLinks = [
    {href: '/', label: t('components.navigation.home')},
    {href: '/lists', label: t('components.navigation.lists')},
    {href: '/settings', label: t('components.navigation.settings')},
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: {xs: '1.25rem', sm: '1.5rem'},
          }}
        >
          {t('components.navigation.brand')}
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{display: {xs: 'none', sm: 'flex'}, gap: 3, alignItems: 'center'}}>
          {navigationLinks.map(link => (
            <MuiLink
              key={link.href}
              href={link.href}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              {link.label}
            </MuiLink>
          ))}
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

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label={t('pages.listConfigurator.navigationOpen')}
          onClick={() => setMobileMenuOpen(true)}
          sx={{display: {xs: 'flex', sm: 'none'}, minWidth: 44, minHeight: 44}}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Navigation Drawer */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <Box sx={{width: 250, pt: 2}}>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2}}>
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              aria-label={t('pages.listConfigurator.navigationClose')}
              sx={{minWidth: 44, minHeight: 44}}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navigationLinks.map(link => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton href={link.href} component="a" onClick={() => setMobileMenuOpen(false)} sx={{py: 1.5}}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {isAuthenticated && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await handleLogout();
                  }}
                  sx={{py: 1.5}}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
