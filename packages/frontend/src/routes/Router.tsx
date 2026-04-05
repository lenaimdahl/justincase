import {CircularProgress, Box} from '@mui/material';
import React from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import {Layout} from 'src/components/Layout';
import {useAuth} from 'src/contexts/AuthContext';
import {Home} from 'src/pages/Home';
import {ListOverviewPage} from 'src/pages/ListOverviewPage';
import {ListDetailPage} from 'src/pages/ListDetailPage';
import {LoginPage} from 'src/pages/LoginPage';
import {RegisterPage} from 'src/pages/RegisterPage';

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return (
      <Box sx={{alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center'}}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<ListOverviewPage />} />
          <Route path="/lists/:listId" element={<ListDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
