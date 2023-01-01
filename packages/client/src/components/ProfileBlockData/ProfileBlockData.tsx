import React from 'react';
import styles from './ProfileBlockData.module.css';
import { ProfileBlockDataProps } from './ProfileBlockData.types';

export const ProfileBlockData: React.FC<ProfileBlockDataProps> = ({
    points, games, rating, userName,
}) => (
    <>
        <div className={styles.userName}>{userName}</div>
        <div className={styles.blocksData}>
            <div className={`${styles.blockData} ${styles.points}`}>
                <p className={styles.number}>{points}</p>
                <p>БАЛЛЫ</p>
            </div>
            <div className={`${styles.blockData} ${styles.games}`}>
                <p className={styles.number}>{games}</p>
                <p>ИГРЫ</p>
            </div>
            <div className={`${styles.blockData} ${styles.ratings}`}>
                <p className={styles.number}>{rating}</p>
                <p>РЕЙТИНГ</p>
            </div>
        </div>
    </>

);
