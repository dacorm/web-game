import { FC } from 'react'
import Button from '../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types'

import style from './GameSearchHeader.module.css'

const GameSearchHeader: FC = () => {
  return (
    <div className={style.header}>
      <div className={style['header-title']}>Ожидают игры</div>
      <div className={style['header-btn']}>
        <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
          Создать игру
        </Button>
      </div>
    </div>
  )
}

export default GameSearchHeader
