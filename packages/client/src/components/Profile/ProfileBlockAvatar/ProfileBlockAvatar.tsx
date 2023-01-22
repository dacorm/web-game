import React from 'react';
import styles from './ProfileBlockAvater.module.css';
import { ProfileBlockAvatarProps } from './ProfileBlockAvatar.types';
import defaultAvatar from '../../../assets/img/defaultUserAvatar.png';

export const ProfileBlockAvatar: React.FC<ProfileBlockAvatarProps> = ({
    avatar,
    onClick,
}) => {
    const userAvatar = avatar && avatar?.includes('null') ? defaultAvatar : avatar;
    return (
        <div className={styles.blockAvatar}>
            <div className={styles.divAvatar} onClick={onClick}>
                <img className={styles.avatar} alt="userLogo" src={userAvatar} />
            </div>
        </div>
    );
};
