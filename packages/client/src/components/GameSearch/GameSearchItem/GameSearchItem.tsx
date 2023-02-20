import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import GameSearchProfile from '../GameSearchProfile';
import { GameSearchItemProps } from './GameSearchItem.types';

import styles from './GameSearchItem.module.css';
import connectInGameImg from '../../../assets/img/connectInGame.svg';
import Button from '../../../shared/ui/Button';
import { sendMessage } from '../../../redux/actionCreators/createGame';
import { Game, Message, MethodsMessages } from '../../../redux/types/createGameReducer.types';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/shared/shared.button.types';
import { GamePlayer } from '../../../redux/types/gameReducer.types';
import { Dispatcher } from '../../../redux/store';

const userInGame = (game:Game, userId:number) => {
    if (game.players.length > 0) {
        const idsPlayers: number[] = [];
        game.players.forEach((p) => idsPlayers.push(p.userId));
        return idsPlayers.includes(userId);
    }
};

const freePlaceInGame = (game:Game) => game.countPlayers > game.players.length;

const GameSearchItem: FC<GameSearchItemProps> = ({ game }) => {
    const dispatch = useDispatch<Dispatcher>();
    const playersAndFreePlaces = [];
    const user = useTypedSelector((state) => state.user);

    if (game.players.length > 0) {
        game.players.forEach((player) => {
            playersAndFreePlaces.push(player);
        });
    }

    while (playersAndFreePlaces.length < game.countPlayers) {
        playersAndFreePlaces.push({
            displayName: 'свободно',
            avatar: connectInGameImg,
            userId: `000${Math.floor(Math.random() * (8 + 1))}0000${Math.floor(Math.random() * (8 + 1))}`,
        });
    }
    const handlerAddUserClick = (e:React.MouseEvent) => {
        e.preventDefault();
        const userGame: GamePlayer = {
            displayName: user.userName,
            avatar: user.avatar,
            userId: user.id,
        };

        const mes = {
            method: MethodsMessages.addUser,
            user: userGame,
            gameId: game.id,
        };

        dispatch(sendMessage(JSON.stringify(mes) as unknown as Message) as unknown as AnyAction);
    };

    return (
        <div className={styles['games-item']}>
            <div className={styles.gameName}>{game.name}</div>
            {playersAndFreePlaces.map(
                ({ userId, displayName, avatar }, index) => (
                    <GameSearchProfile
                        key={userId || `${index}_key`}
                        playerId={userId}
                        userName={displayName}
                        avatar={avatar}
                    />
                ),
            )}
            {!userInGame(game, user.id) && freePlaceInGame(game) && (
                <Button
                    theme={ButtonTheme.GREEN}
                    size={ButtonSize.M}
                    className={styles.btnAdduser}
                    onClick={handlerAddUserClick}
                >
                    Присоединиться
                </Button>
            )}
            <Button
                className={styles.buttonGame}
                theme={ButtonTheme.GREEN}
                size={ButtonSize.M}
            >
                Играть
            </Button>
        </div>
    );
};

export default GameSearchItem;
