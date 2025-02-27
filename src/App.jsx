import React, { useState, useEffect } from 'react';
import TimerDisplay from './timer/TimerDisplay.jsx'; // Import TimerDisplay component
import Settings from './components/Settings.jsx'; // Import Settings component
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
        <div>
            <TimerDisplay title="Pomodoro Timer" />
            <Settings onThemeChange={handleThemeChange} />
        </div>
    );
}

export default App;