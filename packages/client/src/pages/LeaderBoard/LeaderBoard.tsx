import styles from './LeaderBoard.module.css';

import MenuHeader from '../../components/MenuHeader';
import LeaderBoardUserList from '../../components/LeaderBoard/LeaderBoardUserList';
import { ProtectedRoute } from '../../hof/protectedRoute';

const leaders = [
    {
        place: 1, name: 'User1', points: 999, games: 10,
    },
    {
        place: 2, name: 'User2', points: 998, games: 10,
    },
    {
        place: 3, name: 'User3', points: 997, games: 10,
    },
    {
        place: 4, name: 'User4', points: 996, games: 10,
    },
    {
        place: 5, name: 'User1', points: 995, games: 10,
    },
    {
        place: 6, name: 'User2', points: 994, games: 10,
    },
    {
        place: 7, name: 'User3', points: 993, games: 10,
    },
    {
        place: 8, name: 'User4', points: 992, games: 10,
    },
];

function LeaderBoard() {
    return (
        <>
            <MenuHeader text="ЛидерБорд" />
            <div className={styles.leader}>
                <table className={styles.leaderTable}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <td>Место</td>
                            <td>Пользователь</td>
                            <td>Количество баллов</td>
                            <td>Количество игр</td>
                        </tr>
                    </thead>
                    <LeaderBoardUserList leaders={leaders} />
                </table>
            </div>
        </>
    );
}

export default ProtectedRoute(LeaderBoard, {});
