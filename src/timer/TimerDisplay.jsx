import React, { useState, useEffect, useMemo } from "react";
import styles from '../settings/PageLayout.module.css';
import timerStyles from './TimerDisplay.module.css';
import Navbar from "../settings/Navbar";

/**
 * TimerDisplay component - A customizable timer with progress tracking and motivational features
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The title to display above the timer
 * @param {number} props.initialTime - Initial time in seconds for the timer
 * @returns {JSX.Element} The timer display component with controls and progress visualization
 */
const TimerDisplay = ({ title, initialTime }) => {
    /** @type {[number, Function]} Current time remaining in seconds */
    const [time, setTime] = useState(initialTime);
    /** @type {[boolean, Function]} Whether timer is currently running */
    const [isRunning, setIsRunning] = useState(false);
    /** @type {[number, Function]} Current streak count of consecutive days with sessions */
    const [streak, setStreak] = useState(() => {
        // Load streak from localStorage or default to 0
        const savedStreak = localStorage.getItem("streak");
        return savedStreak ? parseInt(savedStreak, 10) : 0;
    });
    /** @type {[Date|null, Function]} Date of last completed session */
    const [lastSessionDate, setLastSessionDate] = useState(() => {
        // Load last session date from localStorage
        const savedDate = localStorage.getItem("lastSessionDate");
        return savedDate ? new Date(savedDate) : null;
    });
    /** @type {[string, Function]} Current motivational quote */
    const [motivationalQuote, setMotivationalQuote] = useState("");
    /** @type {[boolean, Function]} Whether sound effects are enabled */
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    /** @type {[string, Function]} Selected audio file path for timer completion */
    const [selectedAudio, setSelectedAudio] = useState('/alarm.mp3');

    /** Array of motivational quotes to display */
    const motivationalQuotes = useMemo(() => [
        "The secret of getting ahead is getting started.",
        "Don't watch the clock; do what it takes. Keep going.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "You don't have to be great to start, but you have to start to be great.",
        "Believe you can and you're halfway there.",
        "Focus on the process, and the results will follow.",
        "Every minute counts. Make it productive!",
        "Small steps every day lead to big achievements."
    ], []);

    // Set random motivational quote on mount
    useEffect(() => {
        setMotivationalQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, [motivationalQuotes]);

    // Timer countdown effect
    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    /**
     * Starts the timer countdown
     */
    const handleStart = () => {
        setIsRunning(true);
    };

    /**
     * Pauses the timer countdown
     */
    const handlePause = () => {
        setIsRunning(false);
    };

    /**
     * Resets the timer to initial time
     */
    const handleReset = () => {
        setIsRunning(false);
        setTime(initialTime);
    };

    /**
     * Handles timer completion logic including:
     * - Playing completion sound
     * - Updating streak counter
     * - Saving session data
     */
    const handleTimerComplete = () => {
        setIsRunning(false);
        if (isSoundEnabled) {
            const audio = new Audio(selectedAudio);
            audio.play();
        }
        alert("Time's up! Great job!");

        // Update streak logic
        const today = new Date();
        if (lastSessionDate) {
            const diffInTime = today.getTime() - lastSessionDate.getTime();
            const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

            if (diffInDays === 1) {
                // Increment streak if the session is completed the next day
                const newStreak = streak + 1;
                setStreak(newStreak);
                localStorage.setItem("streak", newStreak);
            } else if (diffInDays > 1) {
                // Reset streak if more than one day has passed
                setStreak(1);
                localStorage.setItem("streak", 1);
            }
        } else {
            // First session, initialize streak
            setStreak(1);
            localStorage.setItem("streak", 1);
        }

        // Save today's date as the last session date
        setLastSessionDate(today);
        localStorage.setItem("lastSessionDate", today.toISOString());
    };

    const totalTime = initialTime;
    const progress = totalTime > 0 ? (time / totalTime) * 100 : 0;

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.pageContent}>
                    <h1 className={styles.pageTitle}>{title}</h1>
                    <p className={timerStyles.streakText}>Current Streak: {streak} days</p>

                    <div className={timerStyles.time}>
                        {new Date(time * 1000).toISOString().substr(11, 8)}
                    </div>

                    <div className={timerStyles.progressBarContainer}>
                        <div
                            className={timerStyles.progressBar}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className={timerStyles.audioSettings}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isSoundEnabled}
                                onChange={() => setIsSoundEnabled(!isSoundEnabled)}
                            />
                            Enable Sound
                        </label>
                        <label>
                            Select Audio:
                            <select
                                value={selectedAudio}
                                onChange={(e) => setSelectedAudio(e.target.value)}
                            >
                                <option value="/alarm.mp3">Default Alarm</option>
                                <option value="/beep.mp3">Beep</option>
                                <option value="/chime.mp3">Chime</option>
                            </select>
                        </label>
                    </div>

                    <div className={timerStyles.controls}>
                        <button onClick={handleStart} disabled={isRunning}>Start</button>
                        <button onClick={handlePause} disabled={!isRunning}>Pause</button>
                        <button onClick={handleReset}>Reset</button>
                    </div>

                    <div className={timerStyles.quote}>
                        {motivationalQuote}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimerDisplay;