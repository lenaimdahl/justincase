import {useEffect, useState} from 'react';
import {API_BASE_URL} from 'src/utils/api';

interface AuthConfig {
  googleOAuthEnabled: boolean;
}

/**
 * Hook to fetch auth configuration from the backend
 */
export const useAuthConfig = (): AuthConfig => {
  const [googleOAuthEnabled, setGoogleOAuthEnabled] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/config`)
      .then(res => {
        if (!res.ok) {
          return;
        }
        res
          .json()
          .then((data: AuthConfig) => setGoogleOAuthEnabled(data.googleOAuthEnabled))
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  return {googleOAuthEnabled};
};
