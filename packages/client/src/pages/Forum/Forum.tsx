import { FC } from 'react'
import ForumBlock from '../../components/ForumBlock'
import MenuHeader from '../../components/MenuHeader'

const Forum: FC = () => {
  return (
    <div className="forum">
      <MenuHeader text="Форум" buttonText="Создать тему" />
      <ForumBlock />
    </div>
  )
}

export default Forum
