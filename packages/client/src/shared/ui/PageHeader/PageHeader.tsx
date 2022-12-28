import Button from '../Button'
import { ButtonSize, ButtonTheme } from '../Button/Button.types'
import style from './PageHeader.module.css'

interface PageHeaderProps{
  btn?: boolean
  btnName?: string
  pageName:string
}


const PageHeader = ({btn, btnName, pageName}:PageHeaderProps) => {
  return (
    <div className={style.header}>
      <div className={style['header-title']}>{pageName}</div>
      <div className={style['header-btn']}>
        {btn &&
          <Button size={ButtonSize.M} theme={ButtonTheme.GREEN}>
            {btnName}
          </Button>
        }
      </div>
    </div>
  )
}

export default PageHeader
