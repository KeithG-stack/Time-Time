import React from "react"; // Import React

// ResetButton component that takes in a prop onReset
const ResetButton = ({ onReset }) => {
    return (
        // Button that triggers the onReset function when clicked
        <button onClick={onReset}>
            Reset
        </button>
    );
};

export default ResetButton; // Export the ResetButton component as the default export