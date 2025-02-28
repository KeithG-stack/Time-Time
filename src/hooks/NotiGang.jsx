import { useNotifications } from "../settings/settingsContext";

// Hook to track user analytics
const useAnalytics = () => {
  // Get the addNotification function from the context
  const { addNotification } = useNotifications();

  // Function to track user sessions
  const trackSession = (session) => {
    // Add a notification when the session starts
    addNotification({
      message: `Session ${session.id} started`,
      type: "info",
    });

    // Simulate session end after some time (for demonstration purposes)
    setTimeout(() => {
      // Add a notification when the session ends
      addNotification({
        message: `Session ${session.id} ended`,
        type: "info",
      });

      // Add a notification when a milestone is reached
      if (session.milestone) {
        addNotification({
          message: `Milestone reached: ${session.milestone}`,
          type: "success",
        });
      }
    }, session.duration);
  };

  // Return the trackSession function
  return { trackSession };
}; // End of useAnalytics hook

export default useAnalytics;