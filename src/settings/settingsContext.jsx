import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/** Notification context for displaying alerts/toasts */
const NotificationContext = createContext();

/**
 * NotificationProvider - Context provider for notification system
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} Context provider component
 */
export const NotificationProvider = ({ children }) => {
    /** @type {[Array, Function]} State for active notifications */
    const [notifications, setNotifications] = useState([]);

    /**
     * Adds a new notification
     * @param {Object} notification - Notification details
     * @param {string} notification.message - Notification message
     * @param {string} notification.type - Notification type (e.g. 'info', 'success')
     */
    const addNotification = (notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, { ...notification, id: uuidv4() }]);
    };

    /**
     * Removes a notification by ID
     * @param {string} id - Notification ID to remove
     */
    const removeNotification = (id) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

/**
 * useNotifications hook - Access notification context
 * @hook
 * @returns {Object} Notification context value
 */
export const useNotifications = () => {
    return useContext(NotificationContext);
};