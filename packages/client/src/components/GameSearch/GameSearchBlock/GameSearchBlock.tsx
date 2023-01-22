import {
    FC, useEffect, useRef, useState,
} from 'react';
import GameSearchItem from '../GameSearchItem';
import {
    TExampGameItemsState,
    TExampleGameUsers,
} from './GameSearchBlock.types';

import defaultAvatar from '../../../assets/img/defaultUserAvatar.png';
import styles from './GameSearchBlock.module.css';
import Button from '../../../shared/ui/Button/Button';

const GameSearchBlock: FC = () => {
    const [gameItems, setGameItems] = useState<TExampGameItemsState[]>([]);

    // +- такие данные с бэка будем подтягивать
    const EXAMPLE_GAME_USERS = useRef<TExampleGameUsers[]>([
        { playerId: 1, name: 'userName1', avatar: defaultAvatar },
        { playerId: 2, name: 'userName2', avatar: defaultAvatar },
        { playerId: 3, name: 'cheeeCCK', avatar: defaultAvatar },
    ]);

    const EXAMPLE_GAME_ITEMS_STATE = useRef<TExampGameItemsState[]>([
        { id_game: 1, players: EXAMPLE_GAME_USERS.current },
        { id_game: 2, players: EXAMPLE_GAME_USERS.current },
    ]);

    useEffect(() => {
        setGameItems(EXAMPLE_GAME_ITEMS_STATE.current);
    }, []);

    return (
        <div className={styles['games-block']}>
            <div className={styles['games-block-inner']}>
                {gameItems.map((game) => (
                    <GameSearchItem key={game.id_game} players={game.players} />
                ))}

            </div>
        </div>
    );
};

export default GameSearchBlock;
