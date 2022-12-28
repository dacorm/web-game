import { FC } from 'react'
import Button from '../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types'

import style from './MenuHeader.module.css'
import { MenuHeaderProps } from './MenuHeader.types'

const MenuHeader: FC<MenuHeaderProps> = ({ text, buttonText = null }) => {
  return (
    <div className={style.header}>
      <div className={style['header-title']}>{text}</div>
      {buttonText && (
        <div className={style['header-btn']}>
          <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default MenuHeader
