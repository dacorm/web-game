import ForumBlock from '../../components/Forum/ForumBlock'
import MenuHeader from '../../components/MenuHeader'

import styles from './Forum.module.css'

const Forum = () => {
  return (
    <div className={styles['forum']}>
      <MenuHeader text="Форум" buttonText="Создать тему" />
      <ForumBlock />
    </div>
  )
}

export default Forum
