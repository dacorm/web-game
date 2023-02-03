import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import GameSearchProfile from '../GameSearchProfile';
import { GameSearchItemProps } from './GameSearchItem.types';

import styles from './GameSearchItem.module.css';
import connectInGameImg from '../../../assets/img/connectInGame.svg';
import Button from '../../../shared/ui/Button';
import { sendMessage } from '../../../redux/actionCreators/createGame';
import { Game, MethodsMessages } from '../../../redux/types/createGameReducer.types';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/shared/shared.button.types';
import { GamePlayer } from '../../../redux/types/gameReducer.types';

const userInGame = (game:Game, userId:number) => {
    if (game.players.length > 0) {
        const idsPlayers:number[]|[] = [];
        // @ts-ignore
        game.players.forEach((p:Player) => idsPlayers.push(p.userId));
        // @ts-ignore
        return idsPlayers.includes(userId);
    }
};

const freePlaceInGame = (game:Game) => game.countPlayers > game.players.length;

const GameSearchItem: FC<GameSearchItemProps> = ({ game }) => {
    const dispatch = useDispatch();
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

        // @ts-ignore
        dispatch(sendMessage(JSON.stringify(mes)));
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
