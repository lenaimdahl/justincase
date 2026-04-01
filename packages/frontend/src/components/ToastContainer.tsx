import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {NotificationContext} from 'src/contexts/NotificationContext';
import {getToastIcon, getToastStyles} from 'src/utils/toastUtils';

export const ToastContainer = () => {
  const {t} = useTranslation();
  const context = useContext(NotificationContext);

  if (!context || context.notifications.length === 0) {
    return null;
  }

  const handleCloseNotification = (notificationId: string, e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      context.removeNotification(notificationId);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 pointer-events-none z-50">
      {context.notifications.map(notif => (
        <div
          key={notif.id}
          className={`${getToastStyles(notif.type)} pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-200`}
          role="alert"
        >
          <span className="flex-shrink-0">{getToastIcon(notif.type)}</span>
          <span className="flex-1">{notif.message}</span>
          {notif.duration === undefined && (
            <button
              onClick={() => context.removeNotification(notif.id)}
              onKeyDown={e => handleCloseNotification(notif.id, e)}
              className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
              aria-label={t('components.ariaLabels.closeNotification')}
              type="button"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
