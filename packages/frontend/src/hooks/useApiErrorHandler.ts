import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useNotification} from 'src/hooks/useNotification';

interface ApiError {
  details?: unknown;
  error?: string;
  message?: string;
  status?: number;
}

export const useApiErrorHandler = () => {
  const {t} = useTranslation();
  const notification = useNotification();

  const handleError = useCallback(
    (error: unknown, defaultMessage?: string) => {
      const fallbackMessage = defaultMessage ?? t('errors.generic');
      let errorMessage = fallbackMessage;
      let status: number | undefined;

      if (error instanceof Error) {
        // Handle fetch or custom errors
        if (error.message === 'Failed to fetch') {
          errorMessage = t('errors.network');
        } else {
          errorMessage = error.message;
        }
      } else if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiError;

        status = apiError.status;

        // Classify error by HTTP status
        if (status === 400) {
          // Validation error
          errorMessage = apiError.message || t('errors.validation');
        } else if (status === 404) {
          errorMessage = t('errors.notFound');
        } else if (status === 500 || status === 502 || status === 503) {
          errorMessage = t('errors.server');
        } else if (status === 401 || status === 403) {
          errorMessage = t('errors.forbidden');
        } else {
          errorMessage = apiError.message || fallbackMessage;
        }
      }

      // Log error for debugging
      console.error('[API Error]', {error, message: errorMessage, status});

      // Show notification
      notification.error(errorMessage);

      return {errorMessage, status};
    },
    [notification, t]
  );

  return {handleError};
};
