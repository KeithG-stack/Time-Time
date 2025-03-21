import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/chart-stats">Chart Stats</Link> {/* Add link */}
                </li>
                <li>
                    <Link to="/ranking-system">Ranking System</Link> {/* Add link */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;