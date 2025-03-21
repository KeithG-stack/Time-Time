import React, { useState } from "react";
import { motion } from "framer-motion";

const SmoothTransitionExample = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                Toggle Component
            </button>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    <p>This component has a smooth transition!</p>
                </motion.div>
            )}
        </div>
    );
};

export default SmoothTransitionExample;