import { FC, useEffect, useRef, useState } from 'react'

import styles from './ForumThemeHeader.module.css'
import { ForumThemeHeaderProps } from './ForumThemeHeader.types'

import defaultAvatar from '../../../assets/img/defaultUserAvatar.png'
import { TUser } from '../../../types/global.types'

const ForumThemeHeader: FC<ForumThemeHeaderProps> = ({
  // id_user,
  theme_name,
}) => {
  const [authorTheme, setAuthorTheme] = useState<TUser | null>(null)

  const EXAMPLE_USER = useRef<TUser>({
    id_user: 1,
    name: 'userName1',
    avatar: null,
  })

  useEffect(() => {
    setAuthorTheme(EXAMPLE_USER.current)
  }, [])

  return (
    <div className={styles.header}>
      <div className={styles['headerTitle']}>
        <img
          src={authorTheme?.avatar || defaultAvatar}
          alt="avatar"
          className={styles['avatar']}
        />
        {<div className={styles['name']}>{authorTheme?.name || ''}</div>}
      </div>
      <div className={styles['theme']}>{theme_name}</div>
    </div>
  )
}

export default ForumThemeHeader
