import PageHeader from '../../shared/ui/PageHeader'
import styles from './LeaderBoard.module.css'
import userLogo from '../../assets/img/defaultUserAvatar.png'

const leaders = [
  { place: 1, name: 'User1', points: 999, games: 10 },
  { place: 2, name: 'User2', points: 998, games: 10 },
  { place: 3, name: 'User3', points: 997, games: 10 },
  { place: 4, name: 'User4', points: 996, games: 10 },
  { place: 5, name: 'User1', points: 995, games: 10 },
  { place: 6, name: 'User2', points: 994, games: 10 },
  { place: 7, name: 'User3', points: 993, games: 10 },
  { place: 8, name: 'User4', points: 992, games: 10 },
]

export default function LeaderBoard() {
  return (
    <>
      <PageHeader pageName="ЛидерБорд" />
      <div className={styles.leader}>
        <table className={styles.leaderTable}>
          <tr className={styles.tableHeader}>
            <td>Место</td>
            <td>Пользователь</td>
            <td>Количество баллов</td>
            <td>Количество игр</td>
          </tr>
          {leaders.map(leader => {
            return (
              <tr className={styles.leaderData}>
                <td className={styles.place}>{leader.place}</td>
                <td>
                  <div className={styles.leaderName}>
                    <img
                      className={styles.leaderLogo}
                      src={userLogo}
                      alt={leader.name}
                    />
                    <div>{leader.name}</div>
                  </div>
                </td>
                <td>{leader.points}</td>
                <td>{leader.games}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  )
}
