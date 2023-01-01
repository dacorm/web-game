import { FC, useCallback } from 'react';
import { TExampleGameUsers } from '../GameSearchBlock/GameSearchBlock.types';

import style from './GameSearchProfile.module.css';

const GameSearchProfile: FC<TExampleGameUsers> = ({
    id_player,
    name,
    avatar,
}) => {
    const onConnect = useCallback(() => {
        console.log('connecting...');
    }, []);

    return (
        <div
            className={`${style['games-profile']} ${
                !id_player ? style['games-profile_connect'] : null
            }`}
            data-id-profile={id_player}
            onClick={(!id_player && onConnect) || undefined}
        >
            <img src={avatar} alt="avatar" className={style['profile-avatar']} />
            <div className={style['profile-name']}>{name}</div>
        </div>
    );
};

export default GameSearchProfile;
