import { FC } from 'react';
import GameSearchItem from '../GameSearchItem';
import styles from './GameSearchBlock.module.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IGame } from '../../../models/Game/Game';

const GameSearchBlock: FC = () => {
    const games = useTypedSelector((state) => state.games.games);

    return (
        <div className={styles['games-block']}>
            <div className={styles['games-block-inner']}>
                {games.map((game:IGame) => (
                    <GameSearchItem key={game.id} game={game} />
                ))}

            </div>
        </div>
    );
};

export default GameSearchBlock;
