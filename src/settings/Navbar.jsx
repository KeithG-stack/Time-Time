import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling
import styles from "./Navbar.module.css";
// This component is responsible for rendering the navigation bar
// It uses NavLink from react-router-dom to handle navigation and active link styling
const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/chart-stats"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Chart Stats
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/ranking-system"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Ranking System
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/achievements"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Achievements
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/task"
                        className={({ isActive }) => (isActive ? styles.active : "")}
                    >
                        Tasks
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;