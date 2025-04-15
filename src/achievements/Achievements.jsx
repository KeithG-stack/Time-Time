import React, { useState, useEffect } from "react";
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

const getAchievementProgress = (achievement, userActions) => {
    if (achievement.id.startsWith('achieve_')) {
        const targetMinutes = parseInt(achievement.id.split('_')[1]);
        const currentMinutes = Math.floor(userActions.totalTime / 60);
        return Math.min(100, Math.round((currentMinutes / targetMinutes) * 100));
    }
    return achievement.criteria(userActions) ? 100 : 0;
};

const getAchievementDetails = (achievement) => {
    if (achievement.id === 'start_timer_first_time') {
        return `Start the timer for the first time`;
    } else if (achievement.id === 'reset_under_three_minutes') {
        return `Reset the timer under 3 minutes`;
    }
    return achievement.description;
};

const Achievements = () => {
    const [userActions, setUserActions] = useState({
        startCount: 0,
        resetUnderThreeMinutes: false,
        totalTime: 0
    });

    useEffect(() => {
        const savedActions = localStorage.getItem("userActions");
        if (savedActions) {
            setUserActions(JSON.parse(savedActions));
        }
    }, []);

    return (
        <>
           
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
