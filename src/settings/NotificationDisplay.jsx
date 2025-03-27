import React, { useEffect } from 'react';
import { useNotifications } from './settingsContext';
import styles from './NotificationDisplay.module.css';

const NotificationDisplay = () => {
    const { notifications, removeNotification } = useNotifications();

    useEffect(() => {
        // Automatically remove notifications after 3 seconds
        notifications.forEach(notification => {
            setTimeout(() => {
                removeNotification(notification.id);
            }, 3000);
        });
    }, [notifications, removeNotification]);

    return (
        <div className={styles.notificationContainer}>
            {notifications.map(notification => (
                <div 
                    key={notification.id} 
                    className={`${styles.notification} ${styles[notification.type]}`}
                >
                    {notification.message}
                </div>
            ))}
        </div>
    );
};

export default NotificationDisplay;
