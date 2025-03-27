import React, { useState } from 'react';
import styles from '../settings/Settings.module.css';
import { useNotifications } from '../settings/settingsContext';
import Navbar from "../settings/Navbar"; // Import the Navbar component

const Settings = ({ onThemeChange }) => {
    const [breakTime, setBreakTime] = useState(0);
    const handleBreak = (breakDuration) => {
        setBreakTime(breakDuration);
        alert(`Break started for ${breakDuration / 60} minutes`);
    };
    const [themeColor, setThemeColor] = useState('#ffffff');
    // this is to hold the planned session 
    const [sessionTime, setSessionTime] = useState(''); 
    // to get the notification from the context
    const { addNotification } = useNotifications();
    // this handle theme color change
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
            <Navbar /> {/* Include the Navbar component */}
            <div className={styles.settings}>
                <h2>Settings</h2>
                <div className={styles.settingItem}>
                    <label htmlFor="themeColor">Theme Color:</label>
                    <input
                        type="color"
                        id="themeColor"
                        value={themeColor}
                        onChange={handleThemeColorChange}
                    />
                </div>
                <div className={styles.settingItem}>
                    <label htmlFor="sessionTime">Plan Next Session:</label>
                    <input
                        type="datetime-local"
                        id="sessionTime"
                        value={sessionTime}
                        onChange={handleSessionTimeChange}
                    />
                    <button onClick={handlePlanSession}>Plan Session</button>
                </div>
            </div>
            <div className={styles.settingItem}>
                <button onClick={() => handleBreak(5 * 60)}>5 min Break</button>
                <button onClick={() => handleBreak(10 * 60)}>10 min Break</button>
                <button onClick={() => handleBreak(15 * 60)}>15 min Break</button>
            </div>
        </>

    );
};

export default Settings;