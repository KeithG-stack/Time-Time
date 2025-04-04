import React, { useState, useEffect } from "react";
import styles from "../settings/PageLayout.module.css";
import achievementStyles from "../achievements/Achievements.module.css";
import Navbar from "../settings/Navbar";

export default function Task() {
    const [plannedSessions, setPlannedSessions] = useState([]);

    useEffect(() => {
        console.log('Fetching tasks from localStorage');
        const sessions = JSON.parse(localStorage.getItem('plannedSessions') || '[]');
        console.log('Found tasks:', sessions);
        setPlannedSessions(sessions);
    }, []);

    const handleDelete = (index) => {
        const updatedSessions = [...plannedSessions];
        updatedSessions.splice(index, 1);
        localStorage.setItem('plannedSessions', JSON.stringify(updatedSessions));
        setPlannedSessions(updatedSessions);
    };

    const handleComplete = (index) => {
        const updatedSessions = [...plannedSessions];
        updatedSessions[index].completed = true;
        updatedSessions[index].completedAt = new Date().toISOString();
        localStorage.setItem('plannedSessions', JSON.stringify(updatedSessions));
        setPlannedSessions(updatedSessions);
        
        // Show completion notification
        const taskName = updatedSessions[index].task;
        const notification = {
            message: `Task completed: ${taskName}`,
            type: "success"
        };
        
        // This assumes you have access to notifications context
        // You may need to import and use your notification system here
        if (addNotification) {
            addNotification(notification);
        } else {
            alert(notification.message); // Fallback
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.pageContent}>
                    <h1 className={styles.pageTitle}>Planned Tasks</h1>
                    
                    {plannedSessions.length === 0 ? (
                        <p>No planned tasks yet</p>
                    ) : (
                        <div className={achievementStyles.achievementsList}>
                            {plannedSessions.map((session, index) => (
                                <div key={index} className={`${achievementStyles.achievement} ${session.completed ? achievementStyles.completed : ''}`}>
                                    <div className={achievementStyles.achievementHeader}>
                                        <h3>{session.task}</h3>
                                        {session.completed && (
                                            <span className={achievementStyles.completedBadge}>✓ Completed</span>
                                        )}
                                    </div>
                                    <div className={achievementStyles.details}>
                                        <p>Scheduled for: {new Date(session.dateTime).toLocaleString()}</p>
                                        {session.completedAt && (
                                            <p>Completed at: {new Date(session.completedAt).toLocaleString()}</p>
                                        )}
                                    </div>
                                    <div className={achievementStyles.taskActions}>
                                        {!session.completed && (
                                            <button 
                                                onClick={() => handleComplete(index)}
                                                className={achievementStyles.completeButton}
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(index)}
                                            className={achievementStyles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
