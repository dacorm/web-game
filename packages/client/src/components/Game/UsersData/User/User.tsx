import styles from './User.module.css';
import boom from '../../../../assets/img/bum.png';
import { GamePlayer } from '../../../../redux/types/gameReducer.types';

interface UserProps {
  player: GamePlayer,
  currentPlayer: { displayName: null, userId: null }
}

export const User = ({ player, currentPlayer }:UserProps) => {
    const playerColor = {
        background: player.color,
    };

    return (
        <div className={styles.userData}>
            <div>
                <img alt={player.avatar} src={player.avatar} className={styles.userImg} />
            </div>

            <div className={styles.data}>
                <div>
                    {player.displayName}
                    {' '}
                    {player.currentPos}
                </div>
                <hr className={styles.hr} />
                <div className={styles.balance}>
                    1500
                </div>
            </div>
            <div className={styles.color} style={playerColor}>
                {(player.userId === currentPlayer.userId) && <img src={boom} alt="boom" />}
            </div>
        </div>
    );
};
