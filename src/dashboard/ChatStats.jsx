import React, { useState } from 'react';
import CompletedSessionsChart from '../dashboard/CompleteSessionsChart'; // Import the chart component
import styles from './ChatStats.module.css'; // Import the CSS module

const ChartStats = ({ sessions }) => {
    const [view, setView] = useState('daily'); // State to track the selected view

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Chart Stats</h1>
            <p className={styles.description}>Track your completed sessions over time.</p>

            {/* Buttons to toggle views */}
            <div className={styles.viewButtons}>
                <button
                    className={`${styles.button} ${view === 'daily' ? styles.active : ''}`}
                    onClick={() => setView('daily')}
                >
                    Daily
                </button>
                <button
                    className={`${styles.button} ${view === 'weekly' ? styles.active : ''}`}
                    onClick={() => setView('weekly')}
                >
                    Weekly
                </button>
                <button
                    className={`${styles.button} ${view === 'monthly' ? styles.active : ''}`}
                    onClick={() => setView('monthly')}
                >
                    Monthly
                </button>
            </div>

            <div className={styles.chartWrapper}>
                <CompletedSessionsChart sessions={sessions} view={view} />
            </div>
        </div>
    );
};

export default ChartStats;