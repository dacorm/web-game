import styles from './ForumThemeMessages.module.css'
import { FC, useEffect, useRef } from 'react'
import { ForumThemeMessagesProps } from './ForumThemeMessages.types'
import ForumThemeMessageItem from '../ForumThemeMessageItem'

const ForumThemeMessages: FC<ForumThemeMessagesProps> = ({ messages }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  //временный костыль для скрола сообщений в самый низ  при открытии форума
  useEffect(() => {
    setTimeout(
      () =>
        wrapperRef.current &&
        (wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight),
      10
    )
  }, [])

  return (
    <div ref={wrapperRef} className={styles['messages-wrapper']}>
      <ul className="messages">
        {messages.map((message, index) => (
          <ForumThemeMessageItem key={index} {...message} />
        ))}
      </ul>
    </div>
  )
}

export default ForumThemeMessages
