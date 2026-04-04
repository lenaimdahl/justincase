import {useCallback} from 'react';
import {useNotification} from 'src/hooks/useNotification';

interface ApiError {
  details?: unknown;
  error?: string;
  message?: string;
  status?: number;
}

export const useApiErrorHandler = () => {
  const notification = useNotification();

  const handleError = useCallback(
    (error: unknown, defaultMessage: string = 'An error occurred') => {
      let errorMessage = defaultMessage;
      let status: number | undefined;

      if (error instanceof Error) {
        // Handle fetch or custom errors
        if (error.message === 'Failed to fetch') {
          errorMessage = 'Network error. Please check your connection.';
        } else {
          errorMessage = error.message;
        }
      } else if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiError;

        status = apiError.status;

        // Classify error by HTTP status
        if (status === 400) {
          // Validation error
          errorMessage = apiError.message || 'Please check your input and try again.';
        } else if (status === 404) {
          errorMessage = 'Resource not found. It may have been deleted.';
        } else if (status === 500 || status === 502 || status === 503) {
          errorMessage = 'Server error. Please try again later.';
        } else if (status === 401 || status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else {
          errorMessage = apiError.message || defaultMessage;
        }
      }

      // Log error for debugging
      console.error('[API Error]', {error, message: errorMessage, status});

      // Show notification
      notification.error(errorMessage);

      return {errorMessage, status};
    },
    [notification]
  );

  return {handleError};
};
