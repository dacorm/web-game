import { FC, useRef } from 'react';
import GameSearchProfile from '../GameSearchProfile';
import { GameSearchItemProps } from './GameSearchItem.types';

import styles from './GameSearchItem.module.css';
import connectInGameImg from '../../../assets/img/connectInGame.svg';

const GameSearchItem: FC<GameSearchItemProps> = ({ players }) => {
    const playersAndFreePlaces = useRef(players);

    while (playersAndFreePlaces.current.length < 5) {
        playersAndFreePlaces.current.push({
            name: 'присоединиться',
            avatar: connectInGameImg,
        });
    }

    return (
        <div className={styles['games-item']}>
            {playersAndFreePlaces.current.map(
                ({ playerId, name, avatar }, index) => (
                    <GameSearchProfile
                        key={playerId || `${index}_key`}
                        playerId={playerId}
                        name={name}
                        avatar={avatar}
                    />
                ),
            )}
        </div>
    );
};

export default GameSearchItem;
