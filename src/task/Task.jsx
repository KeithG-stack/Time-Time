import React, { useState, useEffect } from 'react';
import styles from '../settings/PageLayout.module.css';
import Navbar from '../settings/Navbar';

export default function Task() {
    const [plannedSessions, setPlannedSessions] = useState([]);

    useEffect(() => {
        const sessions = JSON.parse(localStorage.getItem('plannedSessions') || '[]');
        setPlannedSessions(sessions);
    }, []);

    const handleDelete = (index) => {
        const updatedSessions = [...plannedSessions];
        updatedSessions.splice(index, 1);
        localStorage.setItem('plannedSessions', JSON.stringify(updatedSessions));
        setPlannedSessions(updatedSessions);
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
                        <div className={styles.taskList}>
                            {plannedSessions.map((session, index) => (
                                <div key={index} className={styles.taskItem}>
                                    <div>
                                        <h3>{session.task}</h3>
                                        <p>Scheduled for: {new Date(session.dateTime).toLocaleString()}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(index)}
                                        className={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
