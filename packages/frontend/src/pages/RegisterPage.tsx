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
import {useNavigate} from 'react-router-dom';
import {useAuth} from 'src/contexts/AuthContext';
import {useAuthConfig} from 'src/hooks/useAuthConfig';
import {API_BASE_URL} from 'src/utils/api';

export const RegisterPage: React.FC = () => {
  const {register} = useAuth();
  const navigate = useNavigate();
  const {googleOAuthEnabled} = useAuthConfig();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await register(email, password, username || undefined);
      navigate('/lists');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
          Create your account
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
            autoComplete="username"
            fullWidth
            label="Username (optional)"
            margin="normal"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            autoComplete="new-password"
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
            {isLoading ? 'Creating account…' : 'Register'}
          </Button>
          {googleOAuthEnabled && (
            <>
              <Divider sx={{my: 2}}>or</Divider>
              <Button component="a" fullWidth href={`${API_BASE_URL}/auth/google`} variant="outlined">
                Sign up with Google
              </Button>
            </>
          )}
          <Box sx={{textAlign: 'center', mt: 1}}>
            <Typography variant="body2">
              {'Already have an account? '}
              <Link href="/login" underline="hover">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
