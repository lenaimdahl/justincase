import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Navigation } from 'src/components/Navigation';

export function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navigation />
      <Outlet />
    </Box>
  );
}
