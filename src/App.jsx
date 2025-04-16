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
import './hooks/global.css';
import './App.css';
import Task from './task/Task.jsx';
import { ThemeProvider, useTheme } from './hooks/ThemeContext.jsx';

function App() {
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
     * Sound enabled state
     * @type {[boolean, Function]} 
     */
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        const savedSoundSetting = localStorage.getItem("isSoundEnabled");
        return savedSoundSetting ? JSON.parse(savedSoundSetting) : true; // Default to true
    });
    
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
     * Handles sound setting change
     * @param {boolean} newSoundSetting - New sound setting
     */
    const handleSoundChange = (newSoundSetting) => {
        setIsSoundEnabled(newSoundSetting);
    };

    return (
        <Router>
            <ThemeProvider>  
                <NotificationProvider>
                    <Navbar />
                    <div>
                        <Routes>
                            <Route path="/" element={
                                <TimerDisplay 
                                    title="FocusFlow" 
                                    addSession={addSession}
                                    initialTime={customTimer}
                                    isSoundEnabled={isSoundEnabled}
                                />
                            } />
                            <Route path="/settings" element={
                                <Settings 
                                    onTimerChange={handleTimerChange} 
                                    onSoundChange={handleSoundChange} 
                                />
                            } />
                            <Route path="/chart-stats" element={<ChartStats sessions={sessions} />} />
                            <Route path="/achievements" element={<Achievements />} />
                            <Route path="/ranking-system" element={<RankingSystem />} />
                            <Route path="/task" element={<Task />} />
                        </Routes>
                        <NotificationDisplay />
                    </div>
                </NotificationProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;