import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Player } from '../../../models/Player/Player';
import { getAllPlayers, getCurrentPlayer } from '../../../redux/reducers/gameReducer/gameSelector';
import { User } from './components/User/User';
import styles from './UsersData.module.css';

export const UsersData = () => {
    const players = useTypedSelector(getAllPlayers);

    const currentPlayer = useTypedSelector(getCurrentPlayer);
    return (
        <div className={styles.usersData}>
            {players.map((player: Player) => (
                <User
                    key={player.userId}
                    player={player}
                    currentPlayer={currentPlayer}
                />
            ))}
        </div>
    );
};
