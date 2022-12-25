import { FC, useEffect, useRef, useState } from 'react'
import { TForumTheme } from './ForumBlock.types'

import style from './ForumBlock.module.css'
import ForumItem from '../ForumItem'

const ForumBlock: FC = () => {
  const [forumThemes, setForumThemes] = useState<TForumTheme[]>([])

  //   примерный ответ с бэка
  const EXAMPLE_FORUM_THEMES = useRef<TForumTheme[]>([
    {
      id_theme: 12,
      created_by_id: 4,
      count_msg: 22,
      date: new Date(),
      name_theme: 'my new theme',
    },
    {
      id_theme: 13,
      created_by_id: 4,
      count_msg: 12,
      date: new Date(),
      name_theme: 'my new second theme',
    },
    {
      id_theme: 14,
      created_by_id: 2,
      count_msg: 2,
      date: new Date(),
      name_theme: 'my new third theme',
    },
  ])

  useEffect(() => {
    setForumThemes(EXAMPLE_FORUM_THEMES.current)
  }, [])

  return (
    <ul className={style['forum-block']}>
      {forumThemes.map(
        ({ id_theme, created_by_id, date, count_msg, name_theme }) => (
          <ForumItem
            key={id_theme}
            id_theme={id_theme}
            created_by_id={created_by_id}
            date={date}
            count_msg={count_msg}
            name_theme={name_theme}
          />
        )
      )}
    </ul>
  )
}
export default ForumBlock
