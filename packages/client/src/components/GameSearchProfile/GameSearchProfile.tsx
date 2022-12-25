import { FC, useCallback } from 'react'
import { TExampleGameUsers } from '../GameSearchBlock/GameSearchBlock.types'

import './GameSearchProfile.css'

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
      className={`games-profile ${!id_player ? 'games-profile_connect' : ''}`}
      data-id-profile={id_player}
      onClick={(!id_player && onConnect) || undefined}>
      <img src={avatar} alt="avatar" className="profile-avatar" />
      <div className="profile-name">{name}</div>
    </div>
  )
}

export default GameSearchProfile
