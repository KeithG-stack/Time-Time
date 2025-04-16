import React, { useState } from "react";
import CompletedSessionsChart from "../dashboard/CompleteSessionsChart";
import Navbar from "../settings/Navbar";
import styles from "../settings/PageLayout.module.css";
import chartStyles from "./ChatStats.module.css";

const ChartStats = ({ sessions }) => {
    const [view, setView] = useState("daily");
// this component displays a chart of completed sessions over time
    // The view state determines the type of chart to display (daily, weekly, monthly, yearly)
    return (
        <>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageContent}>
                    <h1 className={styles.pageTitle}>Chart Stats</h1>
                    <p>Track your completed sessions over time.</p>

                    {/* Buttons to toggle views */}
                    <div className={chartStyles.viewButtons}>
                        <button
                            className={`${chartStyles.button} ${view === "daily" ? chartStyles.active : ""}`}
                            onClick={() => setView("daily")}
                        >
                            Daily
                        </button>
                        <button
                            className={`${chartStyles.button} ${view === "weekly" ? chartStyles.active : ""}`}
                            onClick={() => setView("weekly")}
                        >
                            Weekly
                        </button>
                        <button
                            className={`${chartStyles.button} ${view === "monthly" ? chartStyles.active : ""}`}
                            onClick={() => setView("monthly")}
                        >
                            Monthly
                        </button>
                        <button
                            className={`${chartStyles.button} ${view === "yearly" ? chartStyles.active : ""}`}
                            onClick={() => setView("yearly")}
                        >
                            Yearly
                        </button>
                    </div>

                    {/* Chart */}
                    <div className={chartStyles.chartWrapper}>
                        <CompletedSessionsChart sessions={sessions} view={view} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChartStats;