import { FC } from 'react'
import Button from '../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types'

import styles from './MenuHeader.module.css'
import { MenuHeaderProps } from './MenuHeader.types'

const MenuHeader: FC<MenuHeaderProps> = ({
  text,
  buttonText = null,
  onClick,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles['header-title']}>{text}</div>
      {buttonText && (
        <div className={styles['header-btn']}>
          <Button
            size={ButtonSize.M}
            theme={ButtonTheme.GREEN}
            onClick={onClick}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default MenuHeader
