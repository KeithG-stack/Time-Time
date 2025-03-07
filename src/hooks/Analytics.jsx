import { useState, useEffect } from "react";
import { useNotifications } from "../settings/settingsContext";
import { achievements } from "../common/achievements";

// Hook to track user analytics
const useAnalytics = () => {
  const { addNotification } = useNotifications();
  const [actions, setActions] = useState({
    startCount: 0,
    totalTime: 0,
    resetUnderThreeMinutes: false,
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    // Retrieve achievements from local storage
    const savedAchievements = localStorage.getItem("unlockedAchievements");
    return savedAchievements ? JSON.parse(savedAchievements) : [];
  });

  useEffect(() => {
    // Save achievements to local storage whenever they change
    localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  const trackSession = (session) => {
    addNotification({
      message: `Session ${session.id} started`,
      type: "info",
    });

    setActions((prevActions) => ({
      ...prevActions,
      startCount: prevActions.startCount + 1,
    }));

    setTimeout(() => {
      addNotification({
        message: `Session ${session.id} ended`,
        type: "info",
      });

      setActions((prevActions) => ({
        ...prevActions,
        startCount: prevActions.startCount + 1,
    }));

      checkAchievements();
    }, session.duration);
  };

  const trackReset = (time) => {
    setActions((prevActions) => ({
      ...prevActions,
      resetUnderThreeMinutes: time < 3 * 60,
    }));

    checkAchievements();
  };

  const checkAchievements = () => {
    achievements.forEach((achievement) => {
      if (achievement.criteria(actions) && !unlockedAchievements.includes(achievement.id)) {
        setUnlockedAchievements((prev) => [...prev, achievement.id]);
        addNotification({
          message: `Achievement unlocked: ${achievement.description}`,
          type: "success",
        });
      }
    });
  };

  return { trackSession, trackReset, unlockedAchievements };
};

export default useAnalytics;