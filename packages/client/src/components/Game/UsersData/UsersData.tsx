import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { User } from './User/User';
import styles from './UsersData.module.css';
import { GamePlayer } from '../../../redux/types/gameReducer.types';

export const UsersData = () => {
    const players = useTypedSelector((state) => state.game.players);
    const currentPlayer = useTypedSelector((state) => state.game.currentPlayer);
    return (
        <div className={styles.usersData}>
            {players.map((player:GamePlayer) => (<User player={player} currentPlayer={currentPlayer} />))}

        </div>
    );
};
