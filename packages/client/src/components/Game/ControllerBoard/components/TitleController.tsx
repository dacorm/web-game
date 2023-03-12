import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getCurrentPlayer } from '../../../../redux/reducers/gameReducer/gameSelector';

import styles from './TitleController.module.css';

export const TitleController = () => {
    const currentPlayer = useTypedSelector(getCurrentPlayer);

    return (
        <div className={styles.title}>
            Ход игрока:
            {' '}
            <span className={styles.playerName}>{currentPlayer.displayName}</span>
        </div>
    );
};

export default TitleController;
