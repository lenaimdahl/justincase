/**
 * Toast notification utility functions
 */

import type {NotificationType} from 'src/types/notification';

export const getToastIcon = (type: NotificationType): string => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
      return 'ⓘ';
  }
};

export const getToastStyles = (type: NotificationType): string => {
  const baseStyles = 'px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm font-medium';
  switch (type) {
    case 'success':
      return `${baseStyles} bg-green-100 text-green-800 border border-green-300`;
    case 'error':
      return `${baseStyles} bg-red-100 text-red-800 border border-red-300`;
    case 'warning':
      return `${baseStyles} bg-yellow-100 text-yellow-800 border border-yellow-300`;
    case 'info':
      return `${baseStyles} bg-blue-100 text-blue-800 border border-blue-300`;
  }
};
