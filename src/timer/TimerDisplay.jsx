import React, { useState, useEffect } from "react"; // Import necessary hooks from React
import Timer from "./Timer"; // Import Timer component
import ResetButton from "../components/ResetButton"; // Import ResetButton component
import StartStopButton from "./TimerControls"; // Import StartStopButton component
import styles from './TimerDisplay.module.css'; // Import styles
import { useDarkMode } from '../hooks/useDarkMode'; // Import custom hook for dark mode

const TimerDisplay = ({ title }) => {
    // State to keep track of the time
    const [time, setTime] = useState(25 * 60);
    // State to keep track of whether the timer is running
    const [isRunning, setIsRunning] = useState(false);
    // want to keep track of custom time input
    const [customTime, setCostumeTime] = useState(25);
    // Custom hook to determine if dark mode is enabled
    const isDarkMode = useDarkMode();

    useEffect(() => {
        let interval;
        if (isRunning) {
            // If the timer is running, set an interval to update the time every second
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 1); {
                        playsound();
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (!isRunning && time !== 0) {
            // If the timer is not running and time is not zero, clear the interval
            clearInterval(interval);
        }
        // Cleanup function to clear the interval when the component unmounts or dependencies change
        return () => clearInterval(interval);
    }, [isRunning, time]);

    // Function to handle the start of the timer
    const handleStart = () => {
        setIsRunning(true);
    };

    // Function to handle the stop of the timer
    const handleStop = () => {
        setIsRunning(false);
    };

    // Function to handle the reset of the timer
    const handleReset = () => {
        setTime(customTime * 60);
        setIsRunning(false);
    };

    // want this to handle the custom time change
    const handleCustomTimeChange = (e) => {
        setCostumeTime(e.target.value);
    };

    // this is the sound that will play when the timer is over
    const playsound = () => {
        const audio = new Audio('/alarm.mp3');
        audio.play();
    };

    return (
        <div className={`${styles.timerDisplay} ${isDarkMode ? 'dark-mode' : 'light-mode'}`} role="timer" aria-live="polite">
            <h1>{title}</h1>
            {/* Input for custom time */}
            <input
                type="number"
                value={customTime}
                onChange={handleCustomTimeChange}
                min="1"
                className={styles.customTimeInput}
                />
            {/* Display the timer value in MM:SS format */}
            <p className={styles.time}>{new Date(time * 1000).toISOString().substr(14, 5)}</p>
            <StartStopButton isRunning={isRunning} onStart={handleStart} onStop={handleStop} /> {/* Display the StartStopButton component */}
            <ResetButton onReset={handleReset} /> {/* Display the ResetButton component */}
        </div>
    );
};

export default TimerDisplay;