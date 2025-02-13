import React from "react";
// component is a simple display component that renders the time prop
const Timer = ({ time }) => {

    return (
        <div>
            <h2>{time}</h2>
            {}
        </div>

    );
};

export default Timer;