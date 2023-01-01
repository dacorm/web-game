import { FC, useRef } from 'react';
import GameSearchProfile from '../GameSearchProfile';
import { GameSearchItemProps } from './GameSearchItem.types';

import style from './GameSearchItem.module.css';
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
        <div className={style['games-item']}>
            {playersAndFreePlaces.current.map(
                ({ id_player, name, avatar }, index) => (
                    <GameSearchProfile
                        key={id_player || `${index}_key`}
                        id_player={id_player}
                        name={name}
                        avatar={avatar}
                    />
                ),
            )}
        </div>
    );
};

export default GameSearchItem;
