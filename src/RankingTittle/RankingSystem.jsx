import React from "react";
import { 
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  LinkedinShareButton, LinkedinIcon,
  RedditShareButton, RedditIcon,
  EmailShareButton, EmailIcon,
  WhatsappShareButton, WhatsappIcon
} from "react-share";
import { 
  Award, 
  Trophy, 
  Medal, 
  Calendar, 
  BarChart2, 
  FileText,
  Share2, 
  Check
} from "lucide-react";
import { achievementTypes } from "../RankingTittle/Rank";
import styles from "../settings/PageLayout.module.css";
import rankingStyles from "./RankingSystem.module.css";
import { useTheme } from "../hooks/ThemeContext";

const RankingSystem = () => {
    const { theme } = useTheme();
    const [copied, setCopied] = React.useState(false);
    const shareUrl = window.location.href;
    const title = "Check out my progress in the Productivity App!";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const getRewardIcon = (reward) => {
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
        else if (reward.includes("Daily Tracker")) {
            return <Calendar size={24} color="#4CAF50" />;
        }
        else if (reward.includes("Weekly Insights")) {
            return <BarChart2 size={24} color="#2196F3" />;
        }
        else if (reward.includes("Monthly Report")) {
            return <FileText size={24} color="#9C27B0" />;
        }
        return <Award size={24} />;
    };

    return (
        <div className={`${styles.pageContainer} ${theme}`}>
            <div className={styles.pageContent}>
                <h1 className={styles.pageTitle}>Ranking System</h1>
                
                {/* Share Section */}
                <div className={rankingStyles.shareContainer}>
                    <h3>Share Your Progress</h3>
                    <div className={rankingStyles.shareButtons}>
                        <button 
                            onClick={handleCopy}
                            className={rankingStyles.copyButton}
                        >
                            {copied ? <Check size={16} /> : <Share2 size={16} />}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                        
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        
                        <TwitterShareButton url={shareUrl} title={title}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        
                        <LinkedinShareButton url={shareUrl} title={title}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        
                        <RedditShareButton url={shareUrl} title={title}>
                            <RedditIcon size={32} round />
                        </RedditShareButton>
                        
                        <WhatsappShareButton url={shareUrl} title={title}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        
                        <EmailShareButton url={shareUrl} subject={title}>
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>
                </div>

                {/* Achievements List */}
                {Object.keys(achievementTypes).map((type) => {
                    const { title, tiers } = achievementTypes[type];
                    return (
                        <div key={type} className={`${rankingStyles.achievement} ${theme === 'dark' ? rankingStyles.dark : ''}`}>
                            <h2>{title}</h2>
                            <ul>
                                {tiers.map((tier) => (
                                    <li key={tier.level} className={`${rankingStyles.achievementItem} ${theme === 'dark' ? rankingStyles.darkItem : ''}`}>
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