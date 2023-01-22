import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import GameSearchProfile from '../GameSearchProfile';
import { GameSearchItemProps } from './GameSearchItem.types';

import styles from './GameSearchItem.module.css';
import connectInGameImg from '../../../assets/img/connectInGame.svg';
import Button from '../../../shared/ui/Button';
import { UserGame } from '../../../models/Game/Game';
import { addUserToGame } from '../../../redux/actionCreators/createGame';

const GameSearchItem: FC<GameSearchItemProps> = ({ game, currentuser }) => {
    const dispatch = useDispatch();
    const playersAndFreePlaces = [];
    game.players.forEach((player) => {
        playersAndFreePlaces.push(player);
    });

    while (playersAndFreePlaces.length < game.countPlayers) {
        playersAndFreePlaces.push({
            userName: 'свободно',
            avatar: connectInGameImg,
        });
    }
    const handlerAddUserClick = (e) => {
        e.preventDefault();
        const { target } = e;
        console.log('id', target.id);

        dispatch(addUserToGame(game, currentuser));
    };

    return (
        <div className={styles['games-item']}>
            <div className={styles.gameName}>{game.name}</div>
            {playersAndFreePlaces.map(
                ({ playerId, userName, avatar }, index) => (
                    <GameSearchProfile
                        key={playerId || `${index}_key`}
                        playerId={playerId}
                        userName={userName}
                        avatar={avatar}
                    />
                ),
            )}
            <Button className={styles.btnAdduser} id={game.id} onClick={handlerAddUserClick}>Присоединиться</Button>
            <Button className={styles.buttonGame}>Играть</Button>
        </div>
    );
};

export default GameSearchItem;
