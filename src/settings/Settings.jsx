import React, { useState } from 'react';
import styles from './Settings.module.css';
import pageStyles from './PageLayout.module.css';
import { useNotifications } from './settingsContext';
import Navbar from "./Navbar";

const Settings = ({ onThemeChange }) => {
    const [breakTime, setBreakTime] = useState(0);
    const handleBreak = (breakDuration) => {
        setBreakTime(breakDuration);
        addNotification({ message: `Break started for ${breakDuration / 60} minutes`, type: 'success' });
    };
    const [themeColor, setThemeColor] = useState('#ffffff');
    const [sessionTime, setSessionTime] = useState('');
    const { addNotification } = useNotifications();

    const handleThemeColorChange = (e) => {
        setThemeColor(e.target.value);
        onThemeChange(e.target.value);
    };

    const handleSessionTimeChange = (e) => {
        setSessionTime(e.target.value);
    };

    const handlePlanSession = () => {
        const sessionDate = new Date(sessionTime);
        const now = new Date();
        const timeUntilSession = sessionDate - now;

        if (timeUntilSession > 0) {
            setTimeout(() => {
                addNotification({ message: 'Thank You for Planning with us', type: 'info' });
            }, timeUntilSession - 5 * 60 * 1000);
            addNotification({ message: 'Session planned successfully!', type: 'success' });
        } else {
            addNotification({ message: 'Please select a future time for your session.', type: 'error' });
        }
    };

    return (
        <>
            <Navbar />
            <div className={pageStyles.pageContainer}>
                <div className={pageStyles.pageContent}>
                    <h1 className={pageStyles.pageTitle}>Settings</h1>
                    
                    <div className={styles.settingGroup}>
                        <div className={styles.settingItem}>
                            <label htmlFor="themeColor">Theme Color:</label>
                            <input
                                type="color"
                                id="themeColor"
                                value={themeColor}
                                onChange={handleThemeColorChange}
                            />
                        </div>

                        <div className={styles.breakButtons}>
                            <h3>Break Timer</h3>
                            <div className={styles.buttonGroup}>
                                <button onClick={() => handleBreak(5 * 60)}>5 min Break</button>
                                <button onClick={() => handleBreak(10 * 60)}>10 min Break</button>
                                <button onClick={() => handleBreak(15 * 60)}>15 min Break</button>
                            </div>
                        </div>

                        <div className={styles.settingItem}>
                            <h3>Plan Next Session</h3>
                            <div className={styles.planSession}>
                                <input
                                    type="datetime-local"
                                    id="sessionTime"
                                    value={sessionTime}
                                    onChange={handleSessionTimeChange}
                                />
                                <button onClick={handlePlanSession}>Plan Session</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;