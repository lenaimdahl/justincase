import {useState} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link as MuiLink,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from 'react-i18next';

export const Navigation = () => {
  const {t} = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <Box sx={{display: {xs: 'none', sm: 'flex'}, gap: 3}}>
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
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="menu"
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
              aria-label="close menu"
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
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
