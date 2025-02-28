import React, { useState, useEffect } from 'react';
import TimerDisplay from './timer/TimerDisplay.jsx'; // Import TimerDisplay component
import Settings from './settings/Settings.jsx'; // Import Settings component
import Notifications from './settings/Notifications.jsx'; // Import Notifications component
import { NotificationProvider } from './settings/settingsContext'; // Import NotificationProvider
import './App.css';

function App() {
    const [themeColor, setThemeColor] = useState('#ffffff');

    const handleThemeChange = (color) => {
        setThemeColor(color);
    };

    useEffect(() => {
        document.body.style.backgroundColor = themeColor;
    }, [themeColor]);

    return (
        <NotificationProvider>
            <div>
                <TimerDisplay title="Focus Timer" />
                <Settings onThemeChange={handleThemeChange} />
                <Notifications /> {/* Include the Notifications component */}
            </div>
        </NotificationProvider>
    );
}

export default App;