import { useState, useEffect } from "react";
import { useNotifications } from "../settings/settingsContext";
import { achievements } from "../achievements/achievements";

/**
 * useAnalytics hook - Tracks user analytics and achievements
 * @hook
 * @returns {Object} Hook API
 * @property {Function} trackSession - Tracks a new session
 * @property {Function} trackReset - Tracks reset actions
 * @property {Array} unlockedAchievements - List of unlocked achievement IDs
 */
const useAnalytics = () => {
  const { addNotification } = useNotifications();
  /** @type {[Object, Function]} State tracking user actions */
  const [actions, setActions] = useState({
    startCount: 0,
    totalTime: 0,
    resetUnderThreeMinutes: false,
  });
  
  /** @type {[Array, Function]} State tracking unlocked achievements */
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const savedAchievements = localStorage.getItem("unlockedAchievements");
    return savedAchievements ? JSON.parse(savedAchievements) : [];
  });

  // Persist achievements to localStorage when they change
  useEffect(() => {
    localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  /**
   * Tracks a new session start
   * @param {Object} session - Session details
   * @param {string} session.id - Unique session ID
   * @param {number} [session.duration] - Optional session duration
   */
  const trackSession = (session = { id: Date.now().toString() }) => {
    addNotification({
      message: `Session started`,
      type: "info",
    });

    setActions((prevActions) => ({
      ...prevActions,
      startCount: prevActions.startCount + 1,
    }));

    setTimeout(() => {
      addNotification({
        message: `Session completed`,
        type: "success",
      });
    }, session.duration || 1500);
  };

  /**
   * Tracks a reset action and checks for achievements
   * @param {number} time - The time at which reset occurred
   */
  const trackReset = (time) => {
    setActions((prevActions) => ({
      ...prevActions,
      resetUnderThreeMinutes: time < 3 * 60,
    }));

    checkAchievements();
  };

  /**
   * Checks and unlocks achievements based on user actions
   */
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