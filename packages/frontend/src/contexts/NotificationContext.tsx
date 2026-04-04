import React, {createContext, useCallback, useState} from 'react';
import type {Notification, NotificationContextType, NotificationType} from 'src/types/notification';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({children}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const addNotification = useCallback(
    (type: NotificationType, message: string, duration?: number): string => {
      const id = `${Date.now()}-${Math.random()}`;
      const newNotification: Notification = {
        id,
        type,
        message,
        duration: duration ?? (type === 'success' ? 3000 : undefined),
      };

      setNotifications(prev => [...prev, newNotification]);

      if (newNotification.duration) {
        setTimeout(() => {
          removeNotification(id);
        }, newNotification.duration);
      }

      return id;
    },
    [removeNotification]
  );

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
