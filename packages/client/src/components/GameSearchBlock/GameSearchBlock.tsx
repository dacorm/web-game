import { FC, useEffect, useState } from 'react'
import GameSearchItem from '../GameSearchItem'

const GameSearchBlock: FC = () => {
  const [gameItems, setGameItems] = useState<any>([])

  const EXAMPLE_GAME_USERS = [
    { id_player: 1, name: 'userName1', avatar: '' },
    { id_player: 2, name: 'userName2', avatar: '' },
    { id_player: 3, name: 'cheeeCCK', avatar: '' },
  ]

  const EXAMPLE_GAME_ITEMS_STATE = [
    { id_game: 1, players: EXAMPLE_GAME_USERS },
    { id_game: 1, players: EXAMPLE_GAME_USERS },
  ]

  useEffect(() => {
    setGameItems(EXAMPLE_GAME_ITEMS_STATE)
  }, [])

  return (
    <div className="games-block">
      <div className="games-block-inner">
        {gameItems.map((game: any) => (
          <GameSearchItem key={game.id_game} players={game.players} />
        ))}
      </div>
    </div>
  )
}

export default GameSearchBlock
