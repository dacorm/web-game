import { FC, useEffect, useRef, useState } from 'react'
import { TForumTheme } from './ForumBlock.types'

import styles from './ForumBlock.module.css'
import ForumItem from '../ForumItem'
import Pagination from '../../Pagination'
import { usePaginationItems } from '../../../hooks/usePaginationItems'

const ForumBlock: FC = () => {
  const [forumThemes, setForumThemes] = useState<TForumTheme[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = useRef<number>(7)

  //   примерный ответ с бэка
  const EXAMPLE_FORUM_THEMES = useRef<TForumTheme[]>([
    {
      id_theme: 10,
      created_by_id: 4,
      count_msg: 22,
      date: new Date(),
      name_theme: 'my new theme',
    },
    {
      id_theme: 11,
      created_by_id: 4,
      count_msg: 12,
      date: new Date(),
      name_theme: 'my new second theme',
    },
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
    {
      id_theme: 15,
      created_by_id: 4,
      count_msg: 22,
      date: new Date(),
      name_theme: 'my new theme',
    },
    {
      id_theme: 16,
      created_by_id: 4,
      count_msg: 12,
      date: new Date(),
      name_theme: 'my new second theme',
    },
    {
      id_theme: 17,
      created_by_id: 2,
      count_msg: 2,
      date: new Date(),
      name_theme: 'my new third theme',
    },
  ])

  const currentPaginationItems = usePaginationItems(
    EXAMPLE_FORUM_THEMES.current,
    currentPage,
    PAGE_SIZE.current
  )

  useEffect(() => {
    setForumThemes(currentPaginationItems)
  }, [currentPaginationItems])

  return (
    <>
      <ul className={styles['forumBlock']}>
        {forumThemes.map(theme => {
          if (theme === null) {
            return
          }
          const { id_theme, created_by_id, date, count_msg, name_theme } = theme

          return (
            <ForumItem
              key={id_theme}
              id_theme={id_theme}
              created_by_id={created_by_id}
              date={date}
              count_msg={count_msg}
              name_theme={name_theme}
            />
          )
        })}
      </ul>
      <nav className={styles['paginationNav']}>
        <Pagination
          currentPage={currentPage}
          totalCount={EXAMPLE_FORUM_THEMES.current.length}
          pageSize={PAGE_SIZE.current}
          onPageChange={setCurrentPage}
        />
      </nav>
    </>
  )
}
export default ForumBlock
