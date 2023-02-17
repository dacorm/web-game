import React, { useState, memo } from 'react';
import styles from './NavBarProfile.module.css';
import { NavBarProfileProps } from './NavBarProfile.types';

import { NavBarProfileDropMenu } from '../NavBarProfileDropMenu/NavBarProfileDropMenu';
import { useGeolocation } from '../../../hooks/usePosition';

export const NavBarProfile = memo(
    ({ userLogo, userName }: NavBarProfileProps) => {
        const { coords, isGeolocationEnabled } = useGeolocation();

        const [drop, setDrop] = useState(false);

        const clickHandler = () => {
            setDrop((prev) => !prev);
        };

        return (
            <div className={styles.navbarUser}>
                <div onClick={clickHandler} className={styles.wrapper}>
                    <img src={userLogo} className={styles.userLogo} alt={userName} />
                    {' '}
                    <div className={styles.name}>
                        {userName}
                        {isGeolocationEnabled && <span>{`${coords?.latitude ?? ''} / ${coords?.longitude ?? ''}`}</span>}
                    </div>
                </div>
                <NavBarProfileDropMenu drop={drop} onClick={clickHandler} />
            </div>
        );
    },
);
