import React, { useState, memo } from 'react';
import styles from './NavBarProfile.module.css';
import { NavBarProfileProps } from './NavBarProfile.types';
import { NavBarProfileDropMenu } from '../NavBarProfileDropMenu/NavBarProfileDropMenu';

export const NavBarProfile = memo(({ userLogo, userName }: NavBarProfileProps) => {
    const [drop, Setdrop] = useState(false);

    const clickHandler = () => {
        Setdrop(!drop);
    };

    return (
        <div className={styles.navbarUser}>
            <div onClick={clickHandler}>
                <img src={userLogo} className={styles.userLogo} alt={userName} />
                {' '}
                {userName}
            </div>
            <NavBarProfileDropMenu drop={drop} onClick={clickHandler} />
        </div>
    );
});
