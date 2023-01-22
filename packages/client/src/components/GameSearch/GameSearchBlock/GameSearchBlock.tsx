import {
    FC, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import GameSearchItem from '../GameSearchItem';
import {
    TExampGameItemsState,
    TExampleGameUsers,
} from './GameSearchBlock.types';

import defaultAvatar from '../../../assets/img/defaultUserAvatar.png';
import styles from './GameSearchBlock.module.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IGame, UserGame } from '../../../models/Game/Game';

const GameSearchBlock: FC = () => {
    // const [gameItems, setGameItems] = useState<TExampGameItemsState[]>([]);
    const games = useTypedSelector((state) => state.games.games);
    const user = useTypedSelector((state) => state.user);
    const currentuser: UserGame = {
        userName: user.userName,
        avatar: user.avatar,
        id: user.id,
    };

    // +- такие данные с бэка будем подтягивать
    // const EXAMPLE_GAME_USERS = useRef<TExampleGameUsers[]>([
    //     { playerId: 1, name: 'userName1', avatar: defaultAvatar },
    //     { playerId: 2, name: 'userName2', avatar: defaultAvatar },
    //     { playerId: 3, name: 'cheeeCCK', avatar: defaultAvatar },
    // ]);

    // const EXAMPLE_GAME_ITEMS_STATE = useRef<TExampGameItemsState[]>([
    //     { id_game: 1, players: EXAMPLE_GAME_USERS.current },
    //     { id_game: 2, players: EXAMPLE_GAME_USERS.current },
    // ]);
    //
    // useEffect(() => {
    //     setGameItems(EXAMPLE_GAME_ITEMS_STATE.current);
    // }, []);

    return (
        <div className={styles['games-block']}>
            <div className={styles['games-block-inner']}>
                {games.map((game:IGame) => (
                    <GameSearchItem key={game.id} game={game} currentuser={currentuser} />
                ))}

            </div>
        </div>
    );
};

export default GameSearchBlock;
