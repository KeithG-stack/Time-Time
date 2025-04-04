import React from "react";

/**
 * Timer component - Displays time in a simple format
 * @component
 * @param {Object} props - Component props
 * @param {string|number} props.time - The time value to display
 * @returns {JSX.Element} Simple time display component
 */
const Timer = ({ time }) => {
    return (
        <div>
            <h2>{time}</h2>
        </div>
    );
};

export default Timer;