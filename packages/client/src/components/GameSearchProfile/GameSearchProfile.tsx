import { FC, useCallback } from 'react'
import { TExampleGameUsers } from '../GameSearchBlock/GameSearchBlock.types'

import styles from './GameSearchProfile.module.css'

const GameSearchProfile: FC<TExampleGameUsers> = ({
  id_player,
  name,
  avatar,
}) => {
  const onConnect = useCallback(() => {
    console.log('connecting...')
  }, [])

  return (
    <div
      className={`${styles['games-profile']} ${
        !id_player ? styles['games-profile_connect'] : null
      }`}
      data-id-profile={id_player}
      onClick={(!id_player && onConnect) || undefined}>
      <img src={avatar} alt="avatar" className={styles['profile-avatar']} />
      <div className={styles['profile-name']}>{name}</div>
    </div>
  )
}

export default GameSearchProfile
