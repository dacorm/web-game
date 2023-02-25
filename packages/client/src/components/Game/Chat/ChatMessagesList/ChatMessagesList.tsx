import { FC } from 'react';
import ChatMessagesItem from '../ChatMessagesItem';
import { ChatMessagesListProps } from './ChatMessagesList.types';

import styles from './ChatMessagesList.module.css';

const ChatMessagesList:FC<ChatMessagesListProps> = ({ messages }) => (
    <ul className={styles.chat}>
        {messages.map(({ playerName, message }, index) => (
            <ChatMessagesItem
                /* eslint-disable-next-line */
                key={index} // в данном случае индексы будут всегда статичны
                playerName={playerName}
                message={message}
            />
        ))}
    </ul>
);
export default ChatMessagesList;
