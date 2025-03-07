import React from 'react';
import { useNotifications } from '../settings/settingsContext';
import styles from './Notifications.module.css';

/**
 * Notifications component to display notifications.
 * Uses the useNotifications hook to get notifications and remove them.
 */
const Notifications = () => {
    const { notifications, removeNotification } = useNotifications();

    return (
        <div className={styles.notifications}>
            {notifications.map((notification) => (
                <div key={notification.id} className={`${styles.notification} ${styles[notification.type]}`}>
                    <p>{notification.message}</p>
                    <button onClick={() => removeNotification(notification.id)}>Dismiss</button>
                </div>
            ))}
        </div>
    );
};

export default Notifications;