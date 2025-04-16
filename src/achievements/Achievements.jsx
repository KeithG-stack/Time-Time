import React, { useState, useEffect } from "react";
import { achievements } from "./achievements";
import styles from "../settings/PageLayout.module.css";
import achievementStyles from "./Achievements.module.css";
import { useNotifications } from "../settings/settingsContext";

// This component displays a list of achievements and their statuses.
const getAchievementIcon = (achievement, isUnlocked) => {
    if (!isUnlocked) return '🔒';
    if (achievement.id === 'start_timer_first_time') return '⏱️';
    if (achievement.id === 'reset_under_three_minutes') return '⚡';
    return '🎯';
};
// This function returns the icon for each achievement based on its status and type.
const getAchievementDetails = (achievement, userActions) => {
    if (achievement.id === 'start_timer_first_time') {
        return `Times started: ${userActions.startCount}`;
    } else if (achievement.id === 'reset_under_three_minutes') {
        return achievement.description;
    }
    return '';
};
// This function returns the details for each achievement based on its type and user actions.
const Achievements = () => {
    const [userActions, setUserActions] = useState({
        startCount: 0,
        resetUnderThreeMinutes: false
    });
    const [prevUnlocked, setPrevUnlocked] = useState({});
    const { addNotification } = useNotifications();

    useEffect(() => {
        const savedActions = localStorage.getItem("userActions");
        if (savedActions) {
            setUserActions(JSON.parse(savedActions));
        }
    }, []);

    useEffect(() => {
        // Check for newly unlocked achievements
        achievements.forEach(achievement => {
            const wasUnlocked = prevUnlocked[achievement.id];
            const isUnlocked = achievement.criteria(userActions);
            
            if (isUnlocked && !wasUnlocked) {
                addNotification({
                    message: `Achievement Unlocked: ${achievement.description}`,
                    type: 'success'
                });
            }
        });
        
        // Update previous unlocked state
        const newUnlocked = {};
        achievements.forEach(achievement => {
            newUnlocked[achievement.id] = achievement.criteria(userActions);
        });
        setPrevUnlocked(newUnlocked);
    }, [userActions, addNotification]);
// This effect checks for newly unlocked achievements and updates the previous unlocked state.
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <h1 className={styles.pageTitle}>Achievements</h1>
                <div className={achievementStyles.achievementsList}>
                    {achievements.map((achievement) => {
                        const isUnlocked = achievement.criteria(userActions);
                        
                        return (
                            <div 
                                key={achievement.id}
                                className={`${achievementStyles.achievement} ${isUnlocked ? achievementStyles.unlocked : achievementStyles.locked}`}
                            >
                                <div className={achievementStyles.achievementHeader}>
                                    <span className={achievementStyles.achievementIcon}>
                                        {getAchievementIcon(achievement, isUnlocked)}
                                    </span>
                                    <h3>{achievement.description}</h3>
                                </div>
                                <div className={achievementStyles.details}>
                                    <p className={achievementStyles.requirement}>
                                        {getAchievementDetails(achievement, userActions)}
                                    </p>
                                </div>
                                <div className={achievementStyles.status}>
                                    {isUnlocked ? 'Achievement Unlocked!' : 'Locked'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Achievements;