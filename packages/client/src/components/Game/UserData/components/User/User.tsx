import styles from './User.module.css';
import boom from '../../../../../assets/img/bum.png';
import { Player } from '../../../../../models/Player/Player';

interface UserProps {
  player: Player
  currentPlayer: Player
}

export const User = ({ player, currentPlayer }: UserProps) => {
    const playerColor = {
        background: player.fill,
    };

    return (
        <div className={styles.userData}>
            <div>
                <img
                    alt={player.avatar}
                    src={player.avatar}
                    className={styles.userImg}
                />
            </div>

            <div className={styles.data}>
                <div>
                    {player.displayName}

                </div>
                <hr className={styles.hr} />
                <div className={styles.balance}>
                    {player.balance}
                    {' '}
                    $
                </div>
            </div>
            <div className={styles.color} style={playerColor}>
                {player.userId === currentPlayer.userId && (
                    <img src={boom} alt="boom" />
                )}
            </div>
        </div>
    );
};
