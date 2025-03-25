import React from "react";
import { achievementTypes } from "../RankingTittle/Rank";
import styles from "../settings/PageLayout.module.css"; // Import shared layout styles
import rankingStyles from "./RankingSystem.module.css"; // Import ranking-specific styles
import Navbar from "../settings/Navbar"; // Import the Navbar component

const RankingSystem = () => {
    return (
        <>
            <Navbar /> {/* Include the Navbar component */}
            <div className={styles.pageContainer}>
                <div className={styles.pageContent}>
                    <h1 className={styles.pageTitle}>Ranking System</h1>
                    {Object.keys(achievementTypes).map((type) => {
                        const { title, tiers } = achievementTypes[type];
                        return (
                            <div key={type} className={rankingStyles.achievement}>
                                <h2>{title}</h2>
                                <ul>
                                    {tiers.map((tier) => (
                                        <li key={tier.level}>
                                            Level {tier.level}: {tier.requirement} minutes - {tier.reward}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default RankingSystem;