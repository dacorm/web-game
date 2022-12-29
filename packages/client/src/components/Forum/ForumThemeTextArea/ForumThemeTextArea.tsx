import { FC } from 'react'
import Button from '../../../shared/ui/Button'
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types'

import style from './ForumThemeTextArea.module.css'

const ForumThemeTextArea: FC = () => {
  return (
    <form action="#" className={style.form}>
      <textarea
        name="forum-msg"
        id="forum-msg"
        placeholder="Введите сообщение"
        className={style.textarea}></textarea>
      <div className={style.button}>
        <Button theme={ButtonTheme.GREEN} size={ButtonSize.X}>
          Отправить
        </Button>
      </div>
    </form>
  )
}

export default ForumThemeTextArea
