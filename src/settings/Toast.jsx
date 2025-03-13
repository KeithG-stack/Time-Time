import { useNotifications } from "../settings/settingsContext";
import { useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";
import clsx from "clsx";


const Toast = ({ id, message, type, remove }) => {

  // Remove the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      remove(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, remove]);

  const icons = {
    // Map the type to the corresponding icon
    success: <FaCheckCircle className="text-green-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
    error: <FaTimes className="text-red-500" />,
  };

  return (
    //  Add the toast component with the corresponding styles & icons
    <div className={clsx("toast", "flex items-center space-x-2 p-3 rounded-lg shadow-md", {
      // Add the type-specific background color
        "bg-green-100": type === "success",
        "bg-yellow-100": type === "warning",
        "bg-blue-100": type === "info",
        "bg-red-100": type === "error",
      }
    )} 
      onClick={() => remove(id)}>

      {icons[type]} <span>{message}</span>

    </div>
  );
};

const ToastManager = () => {

  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-2">

      {notifications.map(({ id, message, type }) => (

          <Toast 
          key={id} 
          id={id} 
          message={message} 
          type={type} 
          remove={removeNotification} />
      ))}

    </div>
  );
};

export default ToastManager;