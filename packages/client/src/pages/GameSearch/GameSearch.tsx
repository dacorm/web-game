import { FC } from 'react'
import GameSearchBlock from '../../components/GameSearchBlock'
import GameSearchHeader from '../../components/GameSearchHeader'
import Input from '../../shared/ui/Input'
import './GameSearch.css'

const GameSearch: FC = () => {
  return (
    <div className="search-game">
      <GameSearchHeader />
      <Input type="text" />
      <GameSearchBlock />
    </div>
  )
}

export default GameSearch
