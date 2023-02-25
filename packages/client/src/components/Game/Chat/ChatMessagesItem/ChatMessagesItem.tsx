import { FC } from 'react';

import styles from './ChatMessagesItem.module.css';
import { ChatMessagesItemProps } from './ChatMessagesItem.types';

const ChatMessagesItem:FC<ChatMessagesItemProps> = ({ playerName, message }) => (
    <li className={styles.item}>
        <div className={styles.namePlayer}>{playerName}</div>
        <div className={styles.message}>{message}</div>
    </li>
);

export default ChatMessagesItem;
