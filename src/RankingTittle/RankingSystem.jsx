import React from "react";
import { achievementTypes } from "../RankingTittle/Rank";
import styles from "./RankingSystem.module.css";

const RankingSystem = () => {
    return (
        <div className={styles.container}>
            <h1>Ranking System</h1>
            {Object.keys(achievementTypes).map((type) => {
                const { title, tiers } = achievementTypes[type];
                return (
                    <div key={type} className={styles.achievement}>
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
    );
};

export default RankingSystem;