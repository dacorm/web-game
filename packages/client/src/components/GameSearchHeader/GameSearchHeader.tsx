import { FC } from 'react'
import Button from '../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types'

import styles from './GameSearchHeader.module.css'

const GameSearchHeader: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header-title']}>Ожидают игры</div>
      <div className={styles['header-btn']}>
        <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
          Создать игру
        </Button>
      </div>
    </div>
  )
}

export default GameSearchHeader
