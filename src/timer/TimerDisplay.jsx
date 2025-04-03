import React, { useState, useEffect, useMemo } from "react";
import styles from '../settings/PageLayout.module.css';
import timerStyles from './TimerDisplay.module.css';
import Navbar from "../settings/Navbar";

const TimerDisplay = ({ title, initialTime }) => {
    const [time, setTime] = useState(initialTime); // Use the initial time from props
    const [isRunning, setIsRunning] = useState(false);
    const [streak, setStreak] = useState(0);
    const [motivationalQuote, setMotivationalQuote] = useState("");
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [selectedAudio, setSelectedAudio] = useState('/alarm.mp3');

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

    useEffect(() => {
        setMotivationalQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, [motivationalQuotes]);

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

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(initialTime); // Reset to the initial time from props
    };

    const handleTimerComplete = () => {
        setIsRunning(false);
        if (isSoundEnabled) {
            const audio = new Audio(selectedAudio);
            audio.play();
        }
        alert("Time's up! Great job!");
    };

    const totalTime = initialTime; // Use the initial time for progress calculation
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