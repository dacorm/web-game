import { FC } from 'react'
import ForumBlock from '../../components/Forum/ForumBlock'
import MenuHeader from '../../components/MenuHeader'

import style from './Forum.module.css'

const Forum: FC = () => {
  return (
    <div className={style['forum']}>
      <MenuHeader text="Форум" buttonText="Создать тему" />
      <ForumBlock />
    </div>
  )
}

export default Forum
