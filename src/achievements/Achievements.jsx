import React, { useState } from "react";
import { achievements } from "./achievements";
import styles from "../settings/PageLayout.module.css";
import achievementStyles from "./Achievements.module.css";
import Navbar from "../settings/Navbar";

const getAchievementIcon = (achievement, isUnlocked) => {
    if (!isUnlocked) return '🔒';
    if (achievement.id === 'start_timer_first_time') return '⏱️';
    if (achievement.id === 'reset_under_three_minutes') return '⚡';
    return '🎯';
};

const getAchievementDetails = (achievement) => {
    if (achievement.id.startsWith('achieve_')) {
        const minutes = achievement.id.split('_')[1];
        return `Complete a focused session of ${minutes} minutes`;
    }
    if (achievement.id === 'start_timer_first_time') {
        return "Begin your first focused session";
    }
    if (achievement.id === 'reset_under_three_minutes') {
        return "Reset the timer before completing 3 minutes";
    }
    return "";
};

const getAchievementProgress = (achievement, userActions) => {
    if (achievement.id.startsWith('achieve_')) {
        const targetMinutes = parseInt(achievement.id.split('_')[1]);
        const currentMinutes = Math.floor(userActions.totalTime / 60);
        return Math.min(100, Math.round((currentMinutes / targetMinutes) * 100));
    }
    return achievement.criteria(userActions) ? 100 : 0;
};

const Achievements = () => {
    const [userActions, setUserActions] = useState(() => {
        const savedActions = localStorage.getItem("userActions");
        return savedActions ? JSON.parse(savedActions) : {
            startCount: 0,
            resetUnderThreeMinutes: false,
            totalTime: 0
        };
    });

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.pageContent}>
                    <h1 className={styles.pageTitle}>Achievements</h1>
                    <div className={achievementStyles.achievementsList}>
                        {achievements.map((achievement) => {
                            const isUnlocked = achievement.criteria(userActions);
                            const progress = getAchievementProgress(achievement, userActions);
                            const details = getAchievementDetails(achievement);
                            
                            return (
                                <div 
                                    key={achievement.id} 
                                    className={`${achievementStyles.achievement} ${isUnlocked ? achievementStyles.unlocked : achievementStyles.locked}`}
                                >
                                    <div>
                                        <div className={achievementStyles.achievementHeader}>
                                            <span className={achievementStyles.achievementIcon}>
                                                {isUnlocked ? '🏆' : '🔒'}
                                            </span>
                                            <h3>{achievement.description}</h3>
                                        </div>
                                        <div className={achievementStyles.details}>
                                            <p className={achievementStyles.requirement}>{details}</p>
                                            {achievement.id.startsWith('achieve_') && (
                                                <p>Progress: {Math.floor(userActions.totalTime / 60)} / {achievement.id.split('_')[1]} minutes</p>
                                            )}
                                            {achievement.id === 'start_timer_first_time' && (
                                                <p>Times started: {userActions.startCount}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={achievementStyles.progressSection}>
                                        <div className={achievementStyles.progressBar}>
                                            <div 
                                                className={achievementStyles.progressFill} 
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className={achievementStyles.status}>
                                            {isUnlocked ? 'Achievement Unlocked!' : `${progress}% Complete`}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Achievements;
