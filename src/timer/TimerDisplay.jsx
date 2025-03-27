import React, { useState, useEffect } from "react"; // Import necessary hooks from React
import styles from '../settings/PageLayout.module.css'; // Import shared layout styles
import timerStyles from './TimerDisplay.module.css'; // Import timer-specific styles
import { useDarkMode } from '../hooks/useDarkMode'; // Import custom hook for dark mode
import { useNotifications } from '../settings/settingsContext'; // Import useNotifications hook for notifications
import useAnalytics from '../hooks/Analytics'; // Import useAnalytics hook for tracking sessions and achievements
import { achievements } from '../common/achievements'; // Import achievements array
import { handleStreaks } from '../common/streaks'; // Import function to handle streaks
import { achievementTypes } from "../RankingTittle/Rank"; // Import achievement types and tiers
import Navbar from "../settings/Navbar"; // Import the Navbar component

const TimerDisplay = ({ title, addSession, setIsTimerRunning }) => {
    // State to keep track of the time in seconds
    const [time, setTime] = useState(25 * 60);

    // State to track if the timer is running
    const [isRunning, setIsRunning] = useState(false);

    // State to track custom time input
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);

    // State to track the streak
    const [streak, setStreak] = useState(0);

    // State to track unlocked achievements and animation
    const [unlockedTitle, setUnlockedTitle] = useState("");
    const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

    // State to track motivational quotes
    const [motivationalQuote, setMotivationalQuote] = useState("");

    // State to track break time
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [breakTime, setBreakTime] = useState(0);

    // State to toggle sound on/off
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);

    // State to track the selected audio file
    const [selectedAudio, setSelectedAudio] = useState('/alarm.mp3');

    // State to track total minutes for achievements
    const [totalMinutes, setTotalMinutes] = useState(0);

    // Custom hooks for dark mode, notifications, and analytics
    const { addNotification } = useNotifications();
    const { trackSession, trackReset, unlockedAchievements } = useAnalytics();

    // Function to check and unlock achievements
    const checkAchievements = () => {
        for (const type in achievementTypes) {
            const { title, tiers } = achievementTypes[type];
            for (const tier of tiers) {
                if (totalMinutes >= tier.requirement) {
                    setUnlockedTitle(`${title} - ${tier.reward}`);
                    setShowUnlockAnimation(true); // Trigger the unlock animation
                    setTimeout(() => setShowUnlockAnimation(false), 2000); // Hide the animation after 2 seconds
                }
            }
        }
    };

    // Effect to check achievements whenever totalMinutes changes
    useEffect(() => {
        checkAchievements();
    }, [totalMinutes]);

    // Function to handle session completion
    const handleSessionComplete = () => {
        const totalMinutes = (hours * 60) + minutes;
        setTotalMinutes((prev) => prev + totalMinutes); // Add session minutes to total
        addSession({ id: Date.now(), duration: totalMinutes * 60 });
        addNotification({ message: "Session Completed!", type: "success" });
    };

    // Function to play the selected sound
    const playSound = () => {
        if (isSoundEnabled) {
            const audio = new Audio(selectedAudio);
            audio.play();
        }
    };

    // Array of motivational quotes
    const motivationalQuotes = [
        "The secret of getting ahead is getting started.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "You don’t have to be great to start, but you have to start to be great.",
        "Believe you can and you’re halfway there.",
        "Focus on the process, and the results will follow.",
        "Every minute counts. Make it productive!",
        "Small steps every day lead to big achievements."
    ];

    // Effect to change motivational quotes every 5 minutes when the timer is running
    useEffect(() => {
        let quoteInterval;
        if (isRunning) {
            quoteInterval = setInterval(() => {
                const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
                setMotivationalQuote(randomQuote);
            }, 300000); // Change quote every 5 minutes
        }
        return () => {
            if (quoteInterval) clearInterval(quoteInterval); // Cleanup interval on stop
        };
    }, [isRunning]);

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
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        playSound();
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
                setBreakTime((prevBreakTime) => {
                    if (prevBreakTime <= 1) {
                        setIsOnBreak(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prevBreakTime - 1;
                });
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval); // Cleanup interval on unmount or dependency change
    }, [isRunning, isOnBreak, time, breakTime]);

    // Function to handle the start of the timer
    const handleStart = () => {
        setIsRunning(true);
        setIsTimerRunning(true); // Update the state to indicate the timer is running
        addNotification({ message: "Timer started", type: "info" });
        trackSession({ id: Date.now(), duration: time * 1000 });
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
        setHours(0);
        setMinutes(25);
        setSeconds(0);
        addNotification({ message: "Timer reset", type: "info" });
    };

    // Function to handle custom time input changes
    const handleHoursChange = (e) => {
        setHours(parseInt(e.target.value, 10) || 0);
    };

    const handleMinutesChange = (e) => {
        setMinutes(parseInt(e.target.value, 10) || 0);
    };

    const handleSecondsChange = (e) => {
        setSeconds(parseInt(e.target.value, 10) || 0);
    };

    // Calculate total time and progress for the progress bar
    const totalTime = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + (parseInt(seconds));
    const progress = totalTime > 0 ? (time / totalTime) * 100 : 0;

    // Function to scroll to the achievements section
    const scrollToAchievements = () => {
        document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' });
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