import React, { useState, useEffect } from "react"; // Import necessary hooks from React
import Timer from "./Timer"; // Import Timer component
import ResetButton from "../components/ResetButton"; // Import ResetButton component
import StartStopButton from "./TimerControls"; // Import StartStopButton component
import styles from './TimerDisplay.module.css'; // Import styles
import { useDarkMode } from '../hooks/useDarkMode'; // Import custom hook for dark mode
import { useNotifications } from '../settings/settingsContext'; // Import useNotifications hook
import useAnalytics from '../hooks/Analytics'; // Import useAnalytics hook
import { achievements } from '../common/achievements'; // Import achievements array
import { handleStreaks } from '../common/streaks';

const TimerDisplay = ({ title, addSession, setIsTimerRunning }) => {
    const [time, setTime] = useState(25 * 60); // State to keep track of the time
    const [isRunning, setIsRunning] = useState(false);  // State to keep track of whether the timer is running
    // want to keep track of custom time input
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [streak, setStreak] = useState(0); // State to keep track of the streak
    // this is for the the timer to break
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [breakTime, setBreakTime] = useState(0);
    const isDarkMode = useDarkMode();
    const { addNotification } = useNotifications(); 
    const { trackSession, trackReset, unlockedAchievements } = useAnalytics(); // Get the trackSession and trackReset functions from the useAnalytics hook

    useEffect(() => {
        // Here's where the streaks are being handled when the component mounts
        const currentStreak = handleStreaks();
        setStreak(currentStreak);
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning && !isOnBreak) {
            // If the timer is running, set an interval to update the time every second
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        playsound();
                        setIsRunning(false);
                        setIsTimerRunning(false); // Update the state to indicate the timer is not running
                        clearInterval(interval);
                        handleSessionComplete();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (isOnBreak) {
            interval = setInterval(() => {
                setBreakTime(prevBreakTime => {
                    if (prevBreakTime <= 1) {
                        setIsOnBreak(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prevBreakTime - 1;
                });
            }, 1000);
        } else if (!isRunning && time !== 0) {
            // If the timer is not running and time is not zero, clear the interval
            clearInterval(interval);
        }
        // Cleanup function to clear the interval when the component unmounts or dependencies change
        return () => clearInterval(interval);
    }, [isRunning, isOnBreak, time, breakTime]);

    // Function to handle the start of the timer
    const handleStart = () => {
        setIsRunning(true);
        setIsTimerRunning(true); // Update the state to indicate the timer is running
        addNotification({ message: "Timer started", type: "info" });
        trackSession ({ id: Date.now(), duration: time * 1000, });
    };

    // Function to handle the stop of the timer
    const handleStop = () => {
        setIsRunning(false);
        setIsTimerRunning(false); // Update the state to indicate the timer is not running
        addNotification({ message: "Timer stopped", type: "info" });
    };

    // Function to handle the reset of the timer
    const handleReset = () => {
        const totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + (parseInt(seconds));
        trackReset(time);
        setTime(totalSeconds);
        setIsRunning(false);
        setIsTimerRunning(false); // Update the state to indicate the timer is not running
        addNotification({ message: "Timer reset", type: "info" });
    };

    const handleBreak = (breakDuration) => {
        setIsOnBreak(true);
        setBreakTime(breakDuration);
        addNotification({ message: `Break started for ${breakDuration / 60} minutes`, type: "info" });
    };

    const handleSessionComplete = () => {
        const newSession = {
            id: Date.now(),
            startTime: new Date().toISOString(),
        };
        addSession(newSession);
        addNotification({ message: "Session Completed!", type: "success" });
    };

    // want this to handle the custom time change
    const handleHoursChange = (e) => {
        setHours(e.target.value);
    };

    const handleMinutesChange = (e) => {
        setMinutes(e.target.value);
    };

    const handleSecondsChange = (e) => {
        setSeconds(e.target.value);
    };
    // this is the sound that will play when the timer is over
    const playsound = () => {
        const audio = new Audio('/alarm.mp3');
        audio.play();
    };

    const totalTime = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + (parseInt(seconds));
    const progress = (time / totalTime) * 100;

    // Function to scroll to the achievements section
    const scrollToAchievements = () => {
        document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`${styles.timerDisplay} ${isDarkMode ? 'dark-mode' : 'light-mode'}`} role="timer" aria-live="polite">
            <h1>{title}</h1>
            <p>Current Streak: {streak} days</p>
            {/* Input for custom time */}
            <div className={styles.timeInputs}>
                <input
                    type="number"
                    value={hours}
                    onChange={handleHoursChange}
                    min="0"
                    placeholder="Hours"
                    className={styles.customTimeInput}
                />
                <input 
                    type="number"
                    value={minutes}
                    onChange={handleMinutesChange}
                    min="0"
                    placeholder="Minutes"
                    className={styles.customTimeInput}
                />
                <input
                    type="number"
                    value={seconds}
                    onChange={handleSecondsChange}
                    min="0"
                    placeholder="Seconds"
                    className={styles.customTimeInput}
                />
            </div>
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{width: `${progress}%` }}></div>
            </div>
            {/* Display the timer value in MM:SS format */}
            <p className={styles.time}>{new Date(time * 1000).toISOString().substr(11, 8)}</p>
            <StartStopButton isRunning={isRunning} onStart={handleStart} onStop={handleStop} /> {/* Display the StartStopButton component */}
            <ResetButton onReset={handleReset} /> {/* Display the ResetButton component */}
            <button onClick={() => handleBreak(5 * 60)} className={styles.breakButton}>Take a 5-minute break</button>
            <button onClick={() => handleBreak(10 * 60)} className={styles.breakButton}>Take a 10-minute break</button>
             <button onClick={scrollToAchievements} className={styles.achievementsButton}>Achievements</button>
            <div id="achievements" className={styles.achievements}>
                <h2>Achievements</h2>
                <ul>
                    {unlockedAchievements.map((achievementId) => {
                        const achievement = achievements.find(a => a.id === achievementId);
                        return <li key={achievementId}>{achievement.description}</li>;
                    })}
               </ul>
            </div>            
        </div>
    );
};

export default TimerDisplay;