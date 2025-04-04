import React, { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './timer/TimerDisplay.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './settings/Settings.jsx';
import ChartStats from './dashboard/ChatStats.jsx';
import Achievements from './achievements/Achievements.jsx';
import RankingSystem from "./RankingTittle/RankingSystem.jsx";
import { NotificationProvider } from './settings/settingsContext';
import NotificationDisplay from './settings/NotificationDisplay';
import Navbar from './settings/Navbar';
import './App.css';

/**
 * App - Main application component with routing and state management
 * @component
 * @returns {JSX.Element} The root application component
 */
function App() {
    /**
     * Current theme color state
     * @type {[string, Function]} 
     */
    const [themeColor, setThemeColor] = useState('#ffffff');
    
    /**
     * Completed sessions history state
     * @type {[Array, Function]} 
     */
    const [sessions, setSessions] = useState(() => {
        const savedSessions = localStorage.getItem("completedSessions");
        return savedSessions ? JSON.parse(savedSessions) : [];
    });
    
    /**
     * Custom timer duration in seconds state
     * @type {[number, Function]} 
     */
    const [customTimer, setCustomTimer] = useState(() => {
        const savedTimer = localStorage.getItem("customTimer");
        if (savedTimer) {
            const { hours, minutes, seconds } = JSON.parse(savedTimer);
            return (hours * 3600) + (minutes * 60) + seconds;
        }
        return 25 * 60; // Default to 25 minutes
    });

    /**
     * Handles theme color change
     * @param {string} color - New theme color
     */
    const handleThemeChange = useCallback((color) => {
        setThemeColor(color);
    }, []);
    
    /**
     * Adds a new completed session
     * @param {Object} session - Session details
     */
    const addSession = useCallback((session) => {
        setSessions(prevSessions => {
            const updatedSessions = [...prevSessions, session];
            localStorage.setItem("completedSessions", JSON.stringify(updatedSessions));
            return updatedSessions;
        });
    }, []);
    
    /**
     * Handles timer duration change
     * @param {number} newTime - New timer duration in seconds
     */
    const handleTimerChange = (newTime) => {
        setCustomTimer(newTime);
    };

    /**
     * Updates body background color when theme changes
     */
    useEffect(() => {
        document.body.style.backgroundColor = themeColor;
    }, [themeColor]);

    return (
        <NotificationProvider>
            <Router>
                <Navbar />
                <div>
                    <Routes>
                        <Route path="/" element={
                            <TimerDisplay 
                                title="Focus Timer" 
                                addSession={addSession}
                                initialTime={customTimer}
                            />
                        } />
                        <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} onTimerChange={handleTimerChange} />} />
                        <Route path="/chart-stats" element={<ChartStats sessions={sessions} />} />
                        <Route path="/achievements" element={<Achievements />} />
                        <Route path="/ranking-system" element={<RankingSystem />} />
                    </Routes>
                    <NotificationDisplay />
                </div>
            </Router>
        </NotificationProvider>
    );
}

export default App;