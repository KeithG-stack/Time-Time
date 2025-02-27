import React, { useState } from 'react';
import styles from '../timer/Settings.module.css';


const Settings = ({ onThemeChange }) => {
    const [themeColor, setThemeColor] = useState('#ffffff');

    const handleThemeColorChange = (e) => {
        setThemeColor(e.target.value);
        onThemeChange(e.target.value);
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
        </div>
    );
};

export default Settings;