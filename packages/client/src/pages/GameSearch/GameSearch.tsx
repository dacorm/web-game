import { FC } from 'react'
import GameSearchBlock from '../../components/GameSearchBlock'
import MenuHeader from '../../components/MenuHeader'
import Input from '../../shared/ui/Input'
import './GameSearch.css'

const GameSearch: FC = () => {
  return (
    <div className="search-game">
      <MenuHeader text="Ожидают игры" buttonText="Создать игру" />
      <Input type="text" />
      <GameSearchBlock />
    </div>
  )
}

export default GameSearch
