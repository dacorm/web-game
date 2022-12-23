import styles from './NavBarProfile.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import {NavBarProfileProps } from './NavBarProfile.types';
import { memo } from 'react';

export const  NavBarProfile=memo(({ userLogo, userName }: NavBarProfileProps)=> {

  return (
    <div className={styles.navbarUser}>
      <Link to={'/profile'}>
        <img src={userLogo} className={styles.userLogo} alt={userName} /> {userName}
      </Link>
    </div>
  );
});
