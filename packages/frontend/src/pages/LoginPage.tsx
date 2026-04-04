import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Alert, Box, Button, Container, Divider, IconButton, InputAdornment, Link, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'src/contexts/AuthContext';
import {useAuthConfig} from 'src/hooks/useAuthConfig';
import {API_BASE_URL} from 'src/utils/api';

export const LoginPage: React.FC = () => {
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
      setError(err instanceof Error ? err.message : 'Login failed');
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
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          JustInCase
        </Typography>
        <Typography component="h2" variant="h6" color="text.secondary" gutterBottom>
          Sign in to your account
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
            label="Email"
            margin="normal"
            onChange={e => setEmail(e.target.value)}
            required
            type="email"
            value={email}
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            label="Password"
            margin="normal"
            onChange={e => setPassword(e.target.value)}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
          <Button disabled={isLoading} fullWidth sx={{mt: 2, mb: 1}} type="submit" variant="contained">
            {isLoading ? 'Signing in…' : 'Sign In'}
          </Button>
          {googleOAuthEnabled && (
            <>
              <Divider sx={{my: 2}}>or</Divider>
              <Button component="a" fullWidth href={`${API_BASE_URL}/auth/google`} variant="outlined">
                Sign in with Google
              </Button>
            </>
          )}
          <Box sx={{textAlign: 'center', mt: 1}}>
            <Typography variant="body2">
              {"Don't have an account? "}
              <Link href="/register" underline="hover">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
