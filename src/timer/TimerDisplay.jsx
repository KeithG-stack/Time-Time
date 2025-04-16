import React, { useState, useEffect, useMemo } from "react";
import styles from '../settings/PageLayout.module.css';
import timerStyles from './TimerDisplay.module.css';
import useAnalytics from '../hooks/Analytics';
import { useNotifications } from '../settings/settingsContext';

const TimerDisplay = ({ title, initialTime, isSoundEnabled }) => {
    const { trackSession, trackReset, productivityScore } = useAnalytics();
    const { addNotification } = useNotifications();
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [streak, setStreak] = useState(() => {
        const savedStreak = localStorage.getItem("streak");
        return savedStreak ? parseInt(savedStreak, 10) : 0;
    });
    const [lastSessionDate, setLastSessionDate] = useState(() => {
        const savedDate = localStorage.getItem("lastSessionDate");
        return savedDate ? new Date(savedDate) : null;
    });
    const [userActions, setUserActions] = useState(() => {
        const savedActions = localStorage.getItem("userActions");
        return savedActions ? JSON.parse(savedActions) : { 
            startCount: 0, 
            resetUnderThreeMinutes: false 
        };
    });
    const [motivationalQuote, setMotivationalQuote] = useState("");
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
        
        // Track achievement progress
        const newActions = {
            ...userActions,
            startCount: userActions.startCount + 1
        };
        setUserActions(newActions);
        localStorage.setItem("userActions", JSON.stringify(newActions));
        
        // Check for first time start achievement
        if (newActions.startCount === 1) {
            addNotification({
                message: 'Achievement Unlocked: Start the timer for the first time!',
                type: 'success'
            });
        }
        
        trackSession({ 
            id: Date.now().toString(), 
            duration: initialTime,
            dateTime: new Date().toISOString()
        });
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        
        // Track achievement progress if reset under 3 minutes
        if (time > 0 && time < 180) { // 180 seconds = 3 minutes
            const newActions = {
                ...userActions,
                resetUnderThreeMinutes: true
            };
            setUserActions(newActions);
            localStorage.setItem("userActions", JSON.stringify(newActions));
            
            // Show achievement notification
            addNotification({
                message: 'Achievement Unlocked: Reset the timer under 3 minutes!',
                type: 'success'
            });
        }
        
        trackReset(time);
        setTime(initialTime);
    };

    const handleTimerComplete = () => {
        setIsRunning(false);
        if (isSoundEnabled) {
            const audio = new Audio(selectedAudio);
            audio.play();
        }
        alert("Time's up! Great job!");

        const today = new Date();
        if (lastSessionDate) {
            const diffInTime = today.getTime() - lastSessionDate.getTime();
            const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

            if (diffInDays === 1) {
                const newStreak = streak + 1;
                setStreak(newStreak);
                localStorage.setItem("streak", newStreak);
            } else if (diffInDays > 1) {
                setStreak(1);
                localStorage.setItem("streak", 1);
            }
        } else {
            setStreak(1);
            localStorage.setItem("streak", 1);
        }

        setLastSessionDate(today);
        localStorage.setItem("lastSessionDate", today.toISOString());
    };

    const totalTime = initialTime;
    const progress = totalTime > 0 ? (time / totalTime) * 100 : 0;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <h1 className={styles.pageTitle}>{title}</h1>
                <p className={timerStyles.streakText}>Current Streak: {streak} days</p>

                <div className={timerStyles.time}>
                    {new Date(time * 1000).toISOString().substr(11, 8)}
                </div>

                <div>
                    <h3>Analytics</h3>
                    <p>Productivity Score: {productivityScore}%</p>
                </div>

                <div className={timerStyles.progressBarContainer}>
                    <div
                        className={timerStyles.progressBar}
                        style={{ width: `${progress}%` }}
                    />
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
    );
};

export default TimerDisplay;