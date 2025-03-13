import React, { useState } from 'react';
import styles from '../settings/Settings.module.css';
import { useNotifications} from '../settings/settingsContext';


const Settings = ({ onThemeChange, sessions }) => {
    const [themeColor, setThemeColor] = useState('#ffffff');
    // this is to hold the planned session 
    const [sessionTime, setSessionTime] = useState(''); 
    // to get the notfication from the context
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
            setTimeout(() =>{
                addNotification({ message: 'Thank You for Planning with us', type: 'info' });
            }, timeUntilSession - 5 * 60 * 1000);
            addNotification({ message: 'Session planned successfully!', type: 'success' });
        } else {
            addNotification({ message: 'please seclect a future time for your session.', type: 'error'});
        }
    };
    

    return (
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
            <div className={styles.sessions}>
                <h2>Completed Sessions</h2>
                <ul>
                    {sessions.map((session) => (
                        <li key={session.id}>
                            Session completed on {new Date(session.startTime).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Settings;