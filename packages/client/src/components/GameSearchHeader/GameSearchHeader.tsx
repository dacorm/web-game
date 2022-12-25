import { FC } from 'react'
import Button from '../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types'

import './GameSearchHeader.css'

const GameSearchHeader: FC = () => {
  return (
    <div className="header">
      <div className="header-title">Ожидают игры</div>
      <div className="header-btn">
        <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
          Создать игру
        </Button>
      </div>
    </div>
  )
}

export default GameSearchHeader
