import React, { useState, useEffect } from 'react';
import TimerDisplay from './timer/TimerDisplay.jsx'; // Import TimerDisplay component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes components
import Settings from './settings/Settings.jsx'; // Import Settings component
import Notifications from './settings/Notifications.jsx'; // Import Notifications component
import ChartStats from './dashboard/ChatStats.jsx'; // Import ChartStats component
import Navbar from './settings/Navbar.jsx'; // Import Navbar component
import RankingSystem from "./RankingTittle/RankingSystem.jsx";
import { NotificationProvider } from './settings/settingsContext'; // Import NotificationProvider
import './App.css';

function App() {
    const [themeColor, setThemeColor] = useState('#ffffff');
    const [sessions, setSessions] = useState(() => {
        // Retrieve sessions from local storage
        const savedSessions = localStorage.getItem("completedSessions");
        return savedSessions ? JSON.parse(savedSessions) : [];
    });
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const handleThemeChange = (color) => {
        setThemeColor(color);
    };
    
    const addSession = (session) => {
        const updatedSessions = [...sessions, session];
        setSessions(updatedSessions);
        localStorage.setItem("completedSessions", JSON.stringify(updatedSessions));
    };
    
    useEffect(() => {
        document.body.style.backgroundColor = themeColor;
    }, [themeColor]);

    return (
        <NotificationProvider>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={<TimerDisplay title="Focus Timer" addSession={addSession} setIsTimerRunning={setIsTimerRunning} />}
                        />
                        {!isTimerRunning && (
                            <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} sessions={sessions} />} />
                        )}
                        <Route path="/chart-stats" element={<ChartStats sessions={sessions} />} /> {/* Add Chart Stats route */}
                        
                        <Route path="/ranking-system" element={<RankingSystem />} /> {/* Add route */}
                    </Routes>
                    <Notifications />
                </div>
            </Router>
        </NotificationProvider>
    );
}

export default App;