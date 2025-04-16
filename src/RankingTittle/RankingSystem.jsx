import React from "react";
import { achievementTypes } from "../RankingTittle/Rank";
import styles from "../settings/PageLayout.module.css"; // Import shared layout styles
import rankingStyles from "./RankingSystem.module.css"; // Import ranking-specific styles
import { 
  Award, 
  Trophy, 
  Medal, 
  Calendar, 
  BarChart2, 
  FileText
} from "lucide-react"; // Import icons from lucide-react

// Function to get the appropriate icon based on reward text
const getRewardIcon = (reward) => {
  // For badges (Bronze, Silver, Gold)
  if (reward.includes("Badge")) {
    return <Medal 
      size={24} 
      color={
        reward.includes("Bronze") ? "#CD7F32" : 
        reward.includes("Silver") ? "#C0C0C0" : 
        reward.includes("Gold") ? "#FFD700" : "#000000"
      } 
    />;
  }
  
  // For trophies (Bronze, Silver, Gold)
  else if (reward.includes("Trophy")) {
    return <Trophy 
      size={24} 
      color={
        reward.includes("Bronze") ? "#CD7F32" : 
        reward.includes("Silver") ? "#C0C0C0" : 
        reward.includes("Gold") ? "#FFD700" : "#000000"
      } 
    />;
  }
  
  // For consistency rewards
  else if (reward.includes("Daily Tracker")) {
    return <Calendar size={24} color="#4CAF50" />;
  }
  else if (reward.includes("Weekly Insights")) {
    return <BarChart2 size={24} color="#2196F3" />;
  }
  else if (reward.includes("Monthly Report")) {
    return <FileText size={24} color="#9C27B0" />;
  }
  
  // Default icon
  return <Award size={24} />;
};

const RankingSystem = () => {
    return (
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
                                    <li key={tier.level} className={rankingStyles.achievementItem}>
                                        <span className={rankingStyles.levelInfo}>
                                            Level {tier.level}: {tier.requirement} minutes 
                                        </span>
                                        <span className={rankingStyles.rewardInfo}>
                                            {getRewardIcon(tier.reward)} {tier.reward}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RankingSystem;