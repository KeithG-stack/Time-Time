import { useState, useEffect } from "react";
import { useNotifications } from "../settings/settingsContext";
import { achievements } from "../achievements/achievements";
import jsPDF from 'jspdf';
import { exportToCSV } from '../utilities/exportutils';

// This function calculates the productivity score based on session data.
const calculateProductivityScore = (sessions) => {
    if (!sessions?.length) return 0;

    const totalMinutes = sessions.reduce((acc, session) => acc + (session.duration || 0), 0) / 60;
    const averageSessionLength = totalMinutes / sessions.length;
    const consistencyScore = sessions.length >= 5 ? 1 : sessions.length / 5;
    const durationScore = Math.min(totalMinutes / 120, 1); // Max score for 2 hours
    
    return Math.round((averageSessionLength * 0.4 + consistencyScore * 0.3 + durationScore * 0.3) * 100);
};
// This function calculates the monthly analysis based on session data.
const getMonthlyAnalysis = (sessions) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthlySessions = sessions?.filter(session => {
        const sessionDate = new Date(session.dateTime);
        return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
    }) || [];
    
    return {
        totalSessions: monthlySessions.length,
        totalMinutes: monthlySessions.reduce((acc, session) => acc + (session.duration || 0), 0) / 60,
        averageSession: monthlySessions.length ? 
            (monthlySessions.reduce((acc, session) => acc + (session.duration || 0), 0) / monthlySessions.length) / 60 : 0,
        completedTasks: monthlySessions.filter(s => s.completed).length
    };
};
// This function calculates the yearly comparison based on session data.
const getYearlyComparison = (sessions) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    const groupByYear = (session) => {
        const sessionDate = new Date(session.dateTime);
        return sessionDate.getFullYear();
    };
    
    const yearlyData = sessions?.reduce((acc, session) => {
        const year = groupByYear(session);
        if (!acc[year]) {
            acc[year] = {
                totalSessions: 0,
                totalMinutes: 0,
                completedTasks: 0
            };
        }
        acc[year].totalSessions += 1;
        acc[year].totalMinutes += (session.duration || 0) / 60;
        if (session.completed) acc[year].completedTasks += 1;
        return acc;
    }, {}) || {};
    
    return {
        currentYear: yearlyData[currentYear] || { totalSessions: 0, totalMinutes: 0, completedTasks: 0 },
        lastYear: yearlyData[lastYear] || { totalSessions: 0, totalMinutes: 0, completedTasks: 0 }
    };
};
// This function handles the analytics logic for tracking sessions, achievements, and exporting data.
const useAnalytics = () => {
    const { addNotification } = useNotifications();
    const [actions, setActions] = useState({
        startCount: 0,
        totalTime: 0,
        resetUnderThreeMinutes: false,
    });
    const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
        const savedAchievements = localStorage.getItem("unlockedAchievements");
        return savedAchievements ? JSON.parse(savedAchievements) : [];
    });
    const [sessions, setSessions] = useState(() => {
        const savedSessions = localStorage.getItem('sessions');
        return savedSessions ? JSON.parse(savedSessions) : [];
    });
    const [productivityScore, setProductivityScore] = useState(0);
    const [monthlyAnalysis, setMonthlyAnalysis] = useState({
        totalSessions: 0,
        totalMinutes: 0,
        averageSession: 0,
        completedTasks: 0
    });
    const [yearlyComparison, setYearlyComparison] = useState({
        currentYear: { totalSessions: 0, totalMinutes: 0, completedTasks: 0 },
        lastYear: { totalSessions: 0, totalMinutes: 0, completedTasks: 0 }
    });
    
    useEffect(() => {
        localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    useEffect(() => {
        const score = calculateProductivityScore(sessions);
        setProductivityScore(score);
        setMonthlyAnalysis(getMonthlyAnalysis(sessions));
        setYearlyComparison(getYearlyComparison(sessions));
    }, [sessions]);

    const trackSession = (session = { id: Date.now().toString() }) => {
        const newSession = {
            ...session,
            dateTime: new Date().toISOString(),
            duration: session.duration || 0
        };

        const newSessions = [...sessions, newSession];
        setSessions(newSessions);
        localStorage.setItem('sessions', JSON.stringify(newSessions));
        
        setActions(prev => ({
            ...prev,
            startCount: prev.startCount + 1,
            totalTime: prev.totalTime + (newSession.duration || 0)
        }));

        addNotification({
            message: `Session started and tracked`,
            type: "info"
        });

        checkAchievements();
    };

    const trackReset = (time) => {
        setActions(prev => ({
            ...prev,
            resetUnderThreeMinutes: time < 3 * 60,
        }));

        checkAchievements();
    };
// This function checks if any achievements are unlocked based on the current actions and sessions.
    const checkAchievements = () => {
        achievements.forEach((achievement) => {
            if (achievement.criteria(actions) && !unlockedAchievements.includes(achievement.id)) {
                setUnlockedAchievements(prev => [...prev, achievement.id]);
                addNotification({
                    message: `Achievement unlocked: ${achievement.name} - ${achievement.description}`,
                    type: "success",
                });
            }
        });
    };
// This function exports the session data to CSV and generates a PDF report.
    // It also includes analytics data such as productivity score, monthly analysis, and yearly comparison.
    const exportData = async () => {
        try {
            // Export to CSV
            await exportToCSV(sessions, 'time_tracking_data');
            
            // Generate PDF report
            const doc = new jsPDF();
            doc.setFontSize(20);
            doc.text('Time Tracking Report', 10, 10);
            
            // Add analytics data
            doc.setFontSize(12);
            doc.text(`Productivity Score: ${productivityScore}%`, 10, 30);
            doc.text(`Monthly Sessions: ${monthlyAnalysis.totalSessions}`, 10, 40);
            doc.text(`Monthly Minutes: ${Math.round(monthlyAnalysis.totalMinutes)} min`, 10, 50);
            doc.text(`Completed Tasks: ${monthlyAnalysis.completedTasks}`, 10, 60);
            
            // Add yearly comparison
            doc.text('Yearly Comparison:', 10, 80);
            doc.text(`Current Year: ${yearlyComparison.currentYear.totalSessions} sessions, ${Math.round(yearlyComparison.currentYear.totalMinutes)} min`, 10, 90);
            doc.text(`Last Year: ${yearlyComparison.lastYear.totalSessions} sessions, ${Math.round(yearlyComparison.lastYear.totalMinutes)} min`, 10, 100);
            
            // Save PDF
            doc.save('time_tracking_report.pdf');
            
            addNotification({
                message: 'Data exported successfully',
                type: "success"
            });
        } catch (error) {
            console.error('Export error:', error);
            addNotification({
                message: 'Error exporting data: ' + error.message,
                type: "error"
            });
        }
    };
// This function shares the session data using the Web Share API or copies it to the clipboard if not supported.
    // It includes the productivity score, monthly analysis, and completed tasks.
    const shareData = async () => {
        try {
            const shareData = {
                title: 'My Time Tracking Data',
                text: `Productivity Score: ${productivityScore}%\n` +
                      `Monthly Sessions: ${monthlyAnalysis.totalSessions}\n` +
                      `Monthly Minutes: ${Math.round(monthlyAnalysis.totalMinutes)} min\n` +
                      `Completed Tasks: ${monthlyAnalysis.completedTasks}`,
                url: window.location.href
            };

            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support Web Share API
                const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
                await navigator.clipboard.writeText(textToCopy);
                addNotification({
                    message: 'Data copied to clipboard',
                    type: "info"
                });
            }
        } catch (error) {
            console.error('Sharing failed:', error);
            addNotification({
                message: 'Error sharing data: ' + error.message,
                type: "error"
            });
        }
    };

    return {
        actions,
        sessions,
        productivityScore,
        monthlyAnalysis,
        yearlyComparison,
        unlockedAchievements,
        trackSession,
        trackReset,
        exportData,
        shareData
    };
};

export default useAnalytics;