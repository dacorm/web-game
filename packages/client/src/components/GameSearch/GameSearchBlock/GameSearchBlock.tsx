import { FC } from 'react';
import GameSearchItem from '../GameSearchItem';
import styles from './GameSearchBlock.module.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Game } from '../../../redux/types/createGameReducer.types';

const GameSearchBlock: FC = () => {
    const games = useTypedSelector((state) => state.games.games);
    return (
        <div className={styles['games-block']}>
            <div className={styles['games-block-inner']}>
                {games && games.map((game:Game) => (
                    <GameSearchItem key={game.id} game={game} />
                ))}

            </div>
        </div>
    );
};

export default GameSearchBlock;
