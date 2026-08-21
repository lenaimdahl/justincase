import {Visibility, VisibilityOff} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'src/contexts/AuthContext';
import {useAuthConfig} from 'src/hooks/useAuthConfig';
import {API_BASE_URL} from 'src/utils/api';

export const LoginPage: React.FC = () => {
  const {t} = useTranslation();
  const {login} = useAuth();
  const navigate = useNavigate();
  const {googleOAuthEnabled} = useAuthConfig();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/lists');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          mt: {xs: 4, sm: 8},
          px: {xs: 2, sm: 0},
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          JustInCase
        </Typography>
        <Typography component="h2" variant="h6" color="text.secondary" gutterBottom>
          {t('auth.login.heading')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 2, width: '100%'}}>
          {error && (
            <Alert severity="error" sx={{mb: 2}}>
              {error}
            </Alert>
          )}
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            label={t('common.email')}
            margin="normal"
            onChange={e => setEmail(e.target.value)}
            required
            type="email"
            value={email}
            slotProps={{input: {sx: {minHeight: {xs: 44, sm: 'auto'}}}}}
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            label={t('common.password')}
            margin="normal"
            onChange={e => setPassword(e.target.value)}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(prev => !prev)}
                      edge="end"
                      sx={{minHeight: {xs: 44, sm: 'auto'}, minWidth: {xs: 44, sm: 'auto'}}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {minHeight: {xs: 44, sm: 'auto'}},
              },
            }}
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
          <Button
            disabled={isLoading}
            fullWidth
            sx={{mt: 3, mb: 2, minHeight: {xs: 44, sm: 'auto'}}}
            type="submit"
            variant="contained"
          >
            {isLoading ? t('auth.login.submitting') : t('auth.login.submit')}
          </Button>
          {googleOAuthEnabled && (
            <>
              <Divider sx={{my: 2}}>{t('auth.login.orDivider')}</Divider>
              <Button
                component="a"
                fullWidth
                href={`${API_BASE_URL}/auth/google`}
                variant="outlined"
                sx={{minHeight: {xs: 44, sm: 'auto'}}}
              >
                {t('auth.login.googleButton')}
              </Button>
            </>
          )}
          <Box sx={{textAlign: 'center', mt: 2}}>
            <Typography variant="body2">
              {`${t('auth.login.noAccount')} `}
              <Link href="/register" underline="hover">
                {t('auth.login.registerLink')}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
