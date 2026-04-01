import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {API_BASE_URL} from 'src/utils/api';

interface AuthUser {
  email: string;
  id: string;
  username?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  token: string | null;
  user: AuthUser | null;
}

const TOKEN_KEY = 'justincase_token';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const fetchProfile = useCallback(
    async (accessToken: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        if (!response.ok) {
          clearAuth();
          return;
        }
        const profile = (await response.json()) as AuthUser;
        setUser(profile);
      } catch {
        clearAuth();
      }
    },
    [clearAuth]
  );

  useEffect(() => {
    if (token) {
      fetchProfile(token).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token, fetchProfile]);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      });

      if (!response.ok) {
        const error = (await response.json()) as {message?: string};
        throw new Error(error.message ?? 'Login failed');
      }

      const data = (await response.json()) as {accessToken: string};
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      setToken(data.accessToken);
      await fetchProfile(data.accessToken);
    },
    [fetchProfile]
  );

  const register = useCallback(
    async (email: string, password: string, username?: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        body: JSON.stringify({email, password, username}),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      });

      if (!response.ok) {
        const error = (await response.json()) as {message?: string};
        throw new Error(error.message ?? 'Registration failed');
      }

      const data = (await response.json()) as {accessToken: string};
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      setToken(data.accessToken);
      await fetchProfile(data.accessToken);
    },
    [fetchProfile]
  );

  const logout = useCallback(async () => {
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          headers: {Authorization: `Bearer ${token}`},
          method: 'POST',
        });
      } catch {
        // Ignore logout errors - clear local state regardless
      }
    }
    clearAuth();
  }, [token, clearAuth]);

  const value: AuthContextType = {
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    token,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
