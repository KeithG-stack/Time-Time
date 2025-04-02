import React, { useState, useEffect, useCallback, useMemo } from "react"; 
import styles from '../settings/PageLayout.module.css'; 
import timerStyles from './TimerDisplay.module.css'; 
import { useNotifications } from '../settings/settingsContext'; 
import useAnalytics from '../hooks/Analytics'; 
import { handleStreaks } from '../common/streaks'; 
import Navbar from "../settings/Navbar"; 

const TimerDisplay = ({ title, addSession }) => {
    const [time, setTime] = useState(25 * 60); 
    const [isRunning, setIsRunning] = useState(false); 
    const [hours, setHours] = useState(0); 
    const [minutes, setMinutes] = useState(25); 
    const [seconds, setSeconds] = useState(0); 
    const [streak, setStreak] = useState(0); 
    const [motivationalQuote, setMotivationalQuote] = useState(""); 
    const [isOnBreak, setIsOnBreak] = useState(false); 
    const [breakTime, setBreakTime] = useState(0); 
    const [isSoundEnabled, setIsSoundEnabled] = useState(true); 
    const [selectedAudio, setSelectedAudio] = useState('/alarm.mp3'); 
    const [totalMinutes, setTotalMinutes] = useState(0); 

    const { addNotification } = useNotifications(); 
    const { trackSession, trackReset } = useAnalytics(); 

    const motivationalQuotes = useMemo(() => [
        "The secret of getting ahead is getting started.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "You don't have to be great to start, but you have to start to be great.",
        "Believe you can and you're halfway there.",
        "Focus on the process, and the results will follow.",
        "Every minute counts. Make it productive!",
        "Small steps every day lead to big achievements."
    ], []); 

    useEffect(() => {
        const savedTime = localStorage.getItem('savedTime');
        if (savedTime) {
            setTime(parseInt(savedTime));
        }
        const savedStreak = localStorage.getItem('streak');
        if (savedStreak) {
            setStreak(parseInt(savedStreak));
        }
        const savedTotalMinutes = localStorage.getItem('totalMinutes');
        if (savedTotalMinutes) {
            setTotalMinutes(parseInt(savedTotalMinutes));
        }
        setMotivationalQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, [motivationalQuotes]);

    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime - 1;
                    localStorage.setItem('savedTime', newTime.toString());
                    return newTime;
                });
            }, 1000);
        } else if (time === 0) {
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    useEffect(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }, [time]);

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            trackSession();
        }
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(25 * 60);
        localStorage.setItem('savedTime', (25 * 60).toString());
        trackReset();
    };

    const handleTimerComplete = () => {
        setIsRunning(false);
        if (isSoundEnabled) {
            const audio = new Audio(selectedAudio);
            audio.play();
        }
        
        if (!isOnBreak) {
            const newStreak = handleStreaks(streak);
            setStreak(newStreak);
            localStorage.setItem('streak', newStreak.toString());
            
            const newTotalMinutes = totalMinutes + Math.floor(time / 60);
            setTotalMinutes(newTotalMinutes);
            localStorage.setItem('totalMinutes', newTotalMinutes.toString());
            
            setIsOnBreak(true);
            setBreakTime(5 * 60);
            setTime(5 * 60);
            addNotification("Time for a break! Take 5 minutes to rest.");
        } else {
            setIsOnBreak(false);
            setTime(25 * 60);
            addNotification("Break's over! Ready for another focused session?");
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.pageContent}>
                    <h1 className={styles.pageTitle}>{title}</h1>
                    <p className={timerStyles.streakText}>Current Streak: {streak} days</p>

                    <div className={timerStyles.timeInputs}>
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(parseInt(e.target.value, 10) || 0)}
                            min="0"
                            placeholder="Hours"
                            className={timerStyles.customTimeInput}
                        />
                        <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
                            min="0"
                            placeholder="Minutes"
                            className={timerStyles.customTimeInput}
                        />
                        <input
                            type="number"
                            value={seconds}
                            onChange={(e) => setSeconds(parseInt(e.target.value, 10) || 0)}
                            min="0"
                            placeholder="Seconds"
                            className={timerStyles.customTimeInput}
                        />
                    </div>

                    <div className={timerStyles.time}>
                        {new Date(time * 1000).toISOString().substr(11, 8)}
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