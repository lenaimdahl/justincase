import {useEffect, useState} from 'react';
import {API_BASE_URL} from 'src/utils/api';

interface AuthConfig {
  googleOAuthEnabled: boolean;
}

export function useAuthConfig(): AuthConfig {
  const [googleOAuthEnabled, setGoogleOAuthEnabled] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/config`)
      .then(res => res.json() as Promise<AuthConfig>)
      .then(data => setGoogleOAuthEnabled(data.googleOAuthEnabled))
      .catch(() => setGoogleOAuthEnabled(false));
  }, []);

  return {googleOAuthEnabled};
}
