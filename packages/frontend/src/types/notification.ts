export interface Notification {
  duration?: number; // ms, undefined = persistent
  id: string;
  message: string;
  type: NotificationType;
}

export interface NotificationContextType {
  addNotification: (type: NotificationType, message: string, duration?: number) => string;
  clearAll: () => void;
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export type NotificationType = 'error' | 'info' | 'success' | 'warning';
