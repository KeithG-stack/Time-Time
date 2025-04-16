import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import pageStyles from './PageLayout.module.css';
import { useNotifications } from './settingsContext';
import { useTheme } from '../hooks/ThemeContext';
// this component is responsible for rendering the settings page
const Settings = ({ onTimerChange, onSoundChange }) => {
    const { theme, toggleTheme } = useTheme(); // Use the theme context

    const [breakTime, setBreakTime] = useState(0);
    const handleBreak = (breakDuration) => {
        setBreakTime(breakDuration);
        addNotification({ message: `Break started for ${breakDuration / 60} minutes`, type: 'success' });
    };
    // This function handles the break time and sets it in the state
    // It also adds a notification to inform the user about the break duration
    const [sessionTime, setSessionTime] = useState('');
    const { addNotification } = useNotifications();

    const handleSessionTimeChange = (e) => {
        setSessionTime(e.target.value);
    };
    // This function handles the session time change and sets it in the state
    const handlePlanSession = () => {
        if (!sessionTime) {
            addNotification({ message: 'Please select a date and time', type: 'error' });
            return;
        }
        
        const taskDescription = document.getElementById('taskDescription').value;
        
        if (!taskDescription) {
            addNotification({ message: 'Please enter a task description', type: 'error' });
            return;
        }
        
        const plannedSessions = JSON.parse(localStorage.getItem('plannedSessions') || '[]');
        
        plannedSessions.push({
            dateTime: sessionTime,
            task: taskDescription,
            completed: false,
            completedAt: null
        });
        // Save the planned session to localStorage
        localStorage.setItem('plannedSessions', JSON.stringify(plannedSessions));
        addNotification({ message: 'Session planned successfully!', type: 'success' });
        setSessionTime('');
        document.getElementById('taskDescription').value = '';
    };
    // This function handles the planning of a session
    const [customHours, setCustomHours] = useState(0);
    const [customMinutes, setCustomMinutes] = useState(25); // Default to 25 minutes
    const [customSeconds, setCustomSeconds] = useState(0);

    // Load saved timer settings from localStorage when the component mounts
    useEffect(() => {
        const savedTimer = localStorage.getItem("customTimer");
        if (savedTimer) {
            const { hours, minutes, seconds } = JSON.parse(savedTimer);
            setCustomHours(hours);
            setCustomMinutes(minutes);
            setCustomSeconds(seconds);
            const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
            onTimerChange(totalSeconds); // Update the timer with the saved value
        }
    }, [onTimerChange]);

    const handleSave = () => {
        const totalSeconds = (customHours * 3600) + (customMinutes * 60) + customSeconds;

        // Save the timer settings to localStorage
        localStorage.setItem(
            "customTimer",
            JSON.stringify({
                hours: customHours,
                minutes: customMinutes,
                seconds: customSeconds,
            })
        );

        onTimerChange(totalSeconds); // Pass the custom time to the parent component
        alert("Timer settings saved!");
    };
    // This function handles the saving of custom timer settings
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        const savedSoundSetting = localStorage.getItem("isSoundEnabled");
        return savedSoundSetting ? JSON.parse(savedSoundSetting) : true; // Default to true
    });
    // Load sound settings from localStorage when the component mounts
    const handleSoundToggle = () => {
        const newSoundSetting = !isSoundEnabled;
        setIsSoundEnabled(newSoundSetting);
        localStorage.setItem("isSoundEnabled", JSON.stringify(newSoundSetting));
        onSoundChange(newSoundSetting);
    };

    return (
        // Apply the theme class to the outer container
        <div className={`${pageStyles.pageContainer} ${styles[theme]}`}>
            <div className={pageStyles.pageContent}>
                <h1 className={pageStyles.pageTitle}>Settings</h1>

                <div className={`${styles.settingGroup} ${styles[theme]}`}>
                    {/* Replace theme color picker with theme toggle */}
                    <div className={styles.settingItem}>
                        <label htmlFor="themeToggle">Dark Mode:</label>
                        <input
                            type="checkbox"
                            id="themeToggle"
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
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
                                className={styles[theme]}
                            />
                            <input
                                type="text"
                                id="taskDescription"
                                placeholder="Task description"
                                className={`${styles.taskInput} ${styles[theme]}`}
                            />
                            <button onClick={handlePlanSession}>Plan Session</button>
                        </div>
                    </div>

                    <div className={`${styles.settingGroup} ${styles[theme]}`}>
                        <h2>Customize Timer</h2>
                        <div className={styles.settingItem}>
                            <label>Hours:</label>
                            <input
                                type="number"
                                value={customHours}
                                onChange={(e) => setCustomHours(parseInt(e.target.value, 10) || 0)}
                                min="0"
                                className={styles[theme]}
                            />
                        </div>
                        <div className={styles.settingItem}>
                            <label>Minutes:</label>
                            <input
                                type="number"
                                value={customMinutes}
                                onChange={(e) => setCustomMinutes(parseInt(e.target.value, 10) || 0)}
                                min="0"
                                className={styles[theme]}
                            />
                        </div>
                        <div className={styles.settingItem}>
                            <label>Seconds:</label>
                            <input
                                type="number"
                                value={customSeconds}
                                onChange={(e) => setCustomSeconds(parseInt(e.target.value, 10) || 0)}
                                min="0"
                                className={styles[theme]}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button onClick={handleSave}>Save Timer</button>
                        </div>
                    </div>

                    <div className={styles.settingItem}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isSoundEnabled}
                                onChange={handleSoundToggle}
                            />
                            Enable Sound
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;