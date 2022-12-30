import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants'
import { TForumTheme } from '../ForumBlock/ForumBlock.types'

import styles from './ForumItem.module.css'

const ForumItem: FC<TForumTheme> = ({
  id_theme,
  created_by_id,
  date,
  count_msg,
  name_theme,
}) => {
  return (
    <>
      <li className={styles['item']} data-id-theme={id_theme}>
        <Link to={`${ROUTES.FORUM}/${id_theme}`}>
          <div className={styles['item-info']}>
            <div className={styles['item-author']}>{created_by_id}, </div>
            <div className={styles['item-date']}>{date.toLocaleString()}</div>
          </div>
          <div className={styles['item-inner']}>
            <div className={styles['item-name']}>{name_theme}</div>
            <div className={styles['item-count-msg']}>
              сообщений: {count_msg}
            </div>
          </div>
        </Link>
      </li>
    </>
  )
}

export default ForumItem
