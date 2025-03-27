import React, { useState, useEffect } from 'react';
import TimerDisplay from './timer/TimerDisplay.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './settings/Settings.jsx';
import ChartStats from './dashboard/ChatStats.jsx';
import Navbar from './settings/Navbar.jsx';
import RankingSystem from "./RankingTittle/RankingSystem.jsx";
import { NotificationProvider } from './settings/settingsContext';
import NotificationDisplay from './settings/NotificationDisplay';
import './App.css';

function App() {
    const [themeColor, setThemeColor] = useState('#ffffff');
    const [sessions, setSessions] = useState(() => {
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
                    <Routes>
                        <Route path="/" element={<TimerDisplay title="Focus Timer" addSession={addSession} setIsTimerRunning={setIsTimerRunning} />} />
                        <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} />} />
                        <Route path="/chart-stats" element={<ChartStats sessions={sessions} />} />
                        <Route path="/ranking-system" element={<RankingSystem />} />
                    </Routes>
                    <NotificationDisplay />
                </div>
            </Router>
        </NotificationProvider>
    );
}

export default App;