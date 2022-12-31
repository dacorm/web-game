import { FC, useCallback, useState } from 'react'
import CountPlayerItem from '../CountPlayerItem'

import styles from './CountPlayersList.module.css'
import { CountPlayersListProps } from './CountPlayersList.types'

const CountPlayersList: FC<CountPlayersListProps> = ({ countPlayersAll }) => {
  const [countPlayers, setCountPlayers] = useState<number | null>(null)

  const handleClick = useCallback((e: React.MouseEvent) => {
    setCountPlayers(Number(e.currentTarget?.textContent))
  }, [])

  return (
    <>
      <input type="number" value={countPlayers || 0} hidden readOnly />
      <div className={styles.countPlayers}>
        {countPlayersAll.map(count => (
          <CountPlayerItem
            key={count}
            count={count}
            onClick={handleClick}
            isActive={count === countPlayers}
          />
        ))}
      </div>
    </>
  )
}

export default CountPlayersList
