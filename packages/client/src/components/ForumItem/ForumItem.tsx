import { FC } from 'react'
import { TForumTheme } from '../ForumBlock/ForumBlock.types'

import style from './ForumItem.module.css'

const ForumItem: FC<TForumTheme> = ({
  id_theme,
  created_by_id,
  date,
  count_msg,
  name_theme,
}) => {
  return (
    <>
      <li className={style['item']} data-id-theme={id_theme}>
        <div className={style['item-info']}>
          <div className={style['item-author']}>{created_by_id}, </div>
          <div className={style['item-date']}>{date.toLocaleString()}</div>
        </div>
        <div className={style['item-inner']}>
          <div className={style['item-name']}>{name_theme}</div>
          <div className={style['item-count-msg']}>Сообщений: {count_msg}</div>
        </div>
      </li>
    </>
  )
}

export default ForumItem
