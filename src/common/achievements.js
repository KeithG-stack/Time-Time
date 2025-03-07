/**
 * List of achievements with their criteria.
 * Each achievement has an id, description, and a criteria function.
 * The criteria function takes the user's actions as input and returns a boolean indicating whether the achievement is unlocked.
 */
export const achievements = [
    {
        id: 'start_timer_first_time',
        description: 'Start the timer for the first time',
        criteria: (actions) => actions.startCount === 1,
    },
    {
        id: 'reset_under_three_minutes',
        description: 'Why did You reset You Buggin Buzzin',
        criteria: (actions) => actions.resetUnderThreeMinutes,
    },
    ...Array.from({ length: 12 }, (_, i) => ({
        id: `achieve_${(i + 1) * 5}_minutes`,
        description: `Achieve ${(i + 1) * 5} minutes`,
        criteria: (actions) => actions.totalTime >= (i + 1) * 5 * 60,
    })),
];