import {useContext, useMemo} from 'react';
import {NotificationContext} from 'src/contexts/NotificationContext';

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }

  return useMemo(
    () => ({
      clearAll: context.clearAll,
      error: (message: string) => context.addNotification('error', message),
      info: (message: string, duration?: number) => context.addNotification('info', message, duration),
      remove: context.removeNotification,
      success: (message: string, duration?: number) => context.addNotification('success', message, duration),
      warning: (message: string, duration?: number) => context.addNotification('warning', message, duration),
    }),
    [context]
  );
};
