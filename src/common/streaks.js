/**
 * Function to handle streaks.
 * Checks the last visit date, updates the streak count if necessary, and saves the updated information to local storage.
 */

export const handleStreaks = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('lastvisit');
    let streak = parseInt(localStorage.getItem('streak'), 10) || 0; 

    if (lastVisit) {
        const lastVisitDate = new Date (lastVisit);
        const todayDate = new Date(today);


        // this checks if the user visited the day before
        const isYesterday = (todayDate - lastVisitDate) / (1000 * 60 * 60 * 24) === 1;

        // this check if the user was here today
        const isToday = lastVisit === today;

        if (isYesterday) {
            // streak += 1; this increment the sreak
        } else if (!isToday) {
            streak = 1;
        }
    } else {
        streak = 1;
    }

    // This saves the last date that the user visited
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastVisit', today);

    return streak;
};

