import React, { useState, useEffect } from 'react';
import TimerDisplay from './timer/TimerDisplay.jsx'; // Import TimerDisplay component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes components
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
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<TimerDisplay title="Focus Timer" />} />
                        <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} />} />
                    </Routes>
                    <Notifications />
                </div>
            </Router>
        </NotificationProvider>
    );
}

export default App;