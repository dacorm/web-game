import { FC } from 'react';
import userLogo from '../../../assets/img/defaultUserAvatar.png';
import { TLeaders } from '../LeaderBoardUserList/LeaderBoardUserList.types';
import styles from './LeaderBoardUserItem.module.css';

const LeaderBoardUserItem: FC<TLeaders> = ({
    place, name, points, games,
}) => (
    <tr className={styles.leaderData}>
        <td className={styles.place}>{place}</td>
        <td>
            <div className={styles.leaderName}>
                <img
                    className={styles.leaderLogo}
                    src={userLogo}
                    alt={name}
                />
                <div>{name}</div>
            </div>
        </td>
        <td>{points}</td>
        <td>{games}</td>
    </tr>
);

export default LeaderBoardUserItem;
