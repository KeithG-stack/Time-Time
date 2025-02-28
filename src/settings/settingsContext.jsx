import { createContext, useState, useContext } from "react";

// Create a context for the settings
const NotificationContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const NotificationProvider = ({ children }) => {
  // State to hold the notifications
  const [notifications, setNotifications] = useState([]);

  // Function to add a notification
  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: Date.now(), ...notification },
    ]);
  };

  // Function to remove a notification
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  // Provide the notifications and functions to the children
  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to consume the context
export function useNotifications() {
  return useContext(NotificationContext);
}