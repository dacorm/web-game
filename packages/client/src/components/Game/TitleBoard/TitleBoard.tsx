import { FC } from 'react';
import { TitleBoardProps } from './TitleBoard.types';
import styles from './TitleBoard.module.css';

const TitleBoard:FC<TitleBoardProps> = ({ currentPlayer }) => (
    <div className={styles.title}>
        <div className={styles.player}>
            <div className={styles.playerDescription}>Ход игрока:</div>
            <div className={styles.playerInfo}>{currentPlayer.displayName}</div>
            <div className={styles.playerInfo}>
                {currentPlayer.balance}
                $
            </div>
        </div>
    </div>
);

export default TitleBoard;
