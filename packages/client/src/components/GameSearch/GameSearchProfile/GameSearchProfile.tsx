import { FC, useCallback } from 'react';
import { TExampleGameUsers } from '../GameSearchBlock/GameSearchBlock.types';

import styles from './GameSearchProfile.module.css';

const GameSearchProfile: FC<TExampleGameUsers> = ({
    playerId,
    userName,
    avatar,
}) => {
    const onConnect = useCallback(() => {
        console.log('connecting...');
    }, []);

    return (
        <div
            className={`${styles['games-profile']} ${
                !playerId ? styles['games-profile_connect'] : null
            }`}
            data-id-profile={playerId}
            onClick={(!playerId && onConnect) || undefined}
        >
            <img src={avatar} alt="avatar" className={styles['profile-avatar']} />
            <div className={styles['profile-name']}>{userName}</div>
        </div>
    );
};

export default GameSearchProfile;
