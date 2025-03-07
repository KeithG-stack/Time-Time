import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};

export default Navbar;