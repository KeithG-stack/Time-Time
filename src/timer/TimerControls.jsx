import React from "react";

// StartStopButton component that takes in props isRunning, onStart, and onStop
const StartStopButton = ({ isRunning, onStart, onStop }) => {
    return (
        // Button that toggles between start and stop based on the isRunning state
        <button onClick={isRunning ? onStop : onStart}>
            {isRunning ? "Stop" : "Start Focus Session"}
        </button>
    );
};

export default StartStopButton;
