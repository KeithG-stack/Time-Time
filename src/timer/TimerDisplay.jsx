import React, { useState, useEffect, useCallback, useMemo } from "react"; 
import styles from '../settings/PageLayout.module.css'; 
import timerStyles from './TimerDisplay.module.css'; 
import { useNotifications } from '../settings/settingsContext'; 
import useAnalytics from '../hooks/Analytics'; 
import { achievements } from '../achievements/achievements'; 
import { handleStreaks } from '../common/streaks'; 
import { achievementTypes } from "../RankingTittle/Rank"; 
import Navbar from "../settings/Navbar"; 

const TimerDisplay = ({ title, addSession }) => {
    const [time, setTime] = useState(25 * 60); 
    const [isRunning, setIsRunning] = useState(false); 
    const [hours, setHours] = useState(0); 
    const [minutes, setMinutes] = useState(25); 
    const [seconds, setSeconds] = useState(0); 
    const [streak, setStreak] = useState(0); 
    const [unlockedTitle, setUnlockedTitle] = useState(""); 
    const [showUnlockAnimation, setShowUnlockAnimation] = useState(false); 
    const [motivationalQuote, setMotivationalQuote] = useState(""); 
    const [isOnBreak, setIsOnBreak] = useState(false); 
    const [breakTime, setBreakTime] = useState(0); 
    const [isSoundEnabled, setIsSoundEnabled] = useState(true); 
    const [selectedAudio, setSelectedAudio] = useState('/alarm.mp3'); 
    const [totalMinutes, setTotalMinutes] = useState(0); 

    const { addNotification } = useNotifications(); 
    const { trackSession, trackReset, unlockedAchievements } = useAnalytics(); 

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

    // Function to check and unlock achievements
    const checkAchievements = useCallback(() => {
        for (const type in achievementTypes) {
            const { title, tiers } = achievementTypes[type];
            for (const tier of tiers) {
                if (totalMinutes >= tier.requirement) {
                    setUnlockedTitle(`${title} - ${tier.reward}`);
                    setShowUnlockAnimation(true);
                    setTimeout(() => setShowUnlockAnimation(false), 2000);
                }
            }
        }
    }, [totalMinutes]); 

    useEffect(() => {
        checkAchievements();
    }, [totalMinutes, checkAchievements]); 

    const handleSessionComplete = useCallback(() => {
        const sessionMinutes = (hours * 60) + minutes;
        setTotalMinutes(prev => prev + sessionMinutes);
        addSession({ id: Date.now(), duration: sessionMinutes * 60 });
        addNotification({ message: "Session Completed!", type: "success" });
    }, [hours, minutes, addSession, addNotification]); 

    const playSound = useCallback(() => {
        if (isSoundEnabled && selectedAudio) {
            const audio = new Audio(selectedAudio);
            audio.play().catch(() => {});
        }
    }, [isSoundEnabled, selectedAudio]); 

    useEffect(() => {
        let quoteInterval;
        if (isRunning) {
            const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
            setMotivationalQuote(randomQuote);
            quoteInterval = setInterval(() => {
                const newQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
                setMotivationalQuote(newQuote);
            }, 5 * 60 * 1000);
        }
        return () => clearInterval(quoteInterval);
    }, [isRunning, motivationalQuotes]); 

    const handleStart = useCallback(() => {
        setIsRunning(true);
        addNotification({ message: "Timer started", type: "info" });
        trackSession({ id: Date.now(), duration: time * 1000 });
    }, [time, addNotification, trackSession]); 

    const handleStop = useCallback(() => {
        setIsRunning(false);
        addNotification({ message: "Timer stopped", type: "info" });
    }, [addNotification]); 

    const handleReset = useCallback(() => {
        const totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + (parseInt(seconds));
        trackReset(time);
        setTime(totalSeconds);
        setIsRunning(false);
        setHours(0);
        setMinutes(25);
        setSeconds(0);
        addNotification({ message: "Timer reset", type: "info" });
    }, [hours, minutes, seconds, time, trackReset, addNotification]); 

    const handleHoursChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setHours(value);
    }, []); 

    const handleMinutesChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setMinutes(value);
    }, []); 

    const handleSecondsChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setSeconds(value);
    }, []); 

    // Effect to handle streaks when the component mounts
    useEffect(() => {
        const currentStreak = handleStreaks();
        setStreak(currentStreak);
    }, []); 

    // Effect to handle the timer countdown
    useEffect(() => {
        let interval;
        
        if (isRunning && !isOnBreak) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        playSound();
                        setIsRunning(false);
                        handleSessionComplete();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (isOnBreak) {
            interval = setInterval(() => {
                setBreakTime(prevTime => {
                    if (prevTime <= 1) {
                        setIsOnBreak(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, isOnBreak, playSound, handleSessionComplete]); 

    const totalTime = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + (parseInt(seconds));
    const progress = totalTime > 0 ? (time / totalTime) * 100 : 0;

    const scrollToAchievements = useCallback(() => {
        document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' });
    }, []);

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
                            onChange={handleHoursChange}
                            min="0"
                            placeholder="Hours"
                            className={timerStyles.customTimeInput}
                        />
                        <input
                            type="number"
                            value={minutes}
                            onChange={handleMinutesChange}
                            min="0"
                            placeholder="Minutes"
                            className={timerStyles.customTimeInput}
                        />
                        <input
                            type="number"
                            value={seconds}
                            onChange={handleSecondsChange}
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

                    <div className={timerStyles.progressBarContainer}>
                        <div 
                            className={timerStyles.progressBar}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className={timerStyles.controls}>
                        <button onClick={handleStart} disabled={isRunning}>Start</button>
                        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
                        <button onClick={handleReset}>Reset</button>
                        <button onClick={scrollToAchievements} className={timerStyles.achievementsButton}>
                            Achievements
                        </button>
                    </div>

                    <div id="achievements" className={timerStyles.achievements}>
                        <h2>Achievements</h2>
                        <ul>
                            {unlockedAchievements.map((achievementId) => {
                                const achievement = achievements.find(a => a.id === achievementId);
                                return <li key={achievementId}>{achievement.description}</li>;
                            })}
                        </ul>
                    </div>

                    {showUnlockAnimation && (
                        <div className={timerStyles.unlockedTitle}>
                            {unlockedTitle && <p>{unlockedTitle}</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TimerDisplay;