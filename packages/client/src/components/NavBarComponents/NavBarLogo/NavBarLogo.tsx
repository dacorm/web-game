import React, { memo } from 'react';
import logo from '../../../assets/img/MainLoGo.png';
import styles from './NavBarLogo.module.css';

export const NavBarLogo = memo(() => (
    <div className={styles.navLogoBlock}>
        <img className={styles.mainLogo} src={logo} alt="Monopoly" />
        <div className={styles.textLogo}>Monopoly Game</div>
    </div>
));
