import { FC } from 'react'
import GameSearchBlock from '../../components/GameSearchBlock'
import Button from '../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types'
import './GameSearch.scss'

const GameSearch: FC = () => {
  return (
    <div className="search-game">
      <div className="header">
        <div className="header-title">Ожидают игры</div>
        <div className="header-btn">
          <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
            Создать игру
          </Button>
        </div>
      </div>
      <GameSearchBlock />
    </div>
  )
}

export default GameSearch
