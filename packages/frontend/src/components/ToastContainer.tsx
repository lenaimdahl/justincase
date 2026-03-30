import React from 'react';
import {useContext} from 'react';
import {NotificationContext} from 'src/contexts/NotificationContext';
import type {NotificationType} from 'src/types/notification';

const getIcon = (type: NotificationType) => {
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

const getStyles = (type: NotificationType) => {
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

export const ToastContainer: React.FC = () => {
  const context = useContext(NotificationContext);

  if (!context || context.notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 pointer-events-none z-50">
      {context.notifications.map(notif => (
        <div
          key={notif.id}
          className={`${getStyles(notif.type)} pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-200`}
          role="alert"
        >
          <span className="flex-shrink-0">{getIcon(notif.type)}</span>
          <span className="flex-1">{notif.message}</span>
          {notif.duration === undefined && (
            <button
              onClick={() => context.removeNotification(notif.id)}
              className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
              aria-label="Close notification"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
