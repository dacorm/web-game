import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getGameChatMessages } from '../../../../redux/reducers/gameReducer/gameSelector';
import ChatMessagesList from '../ChatMessagesList';
import { setAutoscroll } from '../utils/setAutoscroll';
import styles from './ChatBoard.module.css';

const ChatBoard: FC = () => {
    const chatBoardRef = useRef<HTMLDivElement>(null);
    const messages = useSelector(getGameChatMessages);

    useEffect(() => {
        const chatBoard = chatBoardRef.current as HTMLDivElement;

        setAutoscroll(chatBoard, 50);
    }, [messages]);

    return (
        <div ref={chatBoardRef} className={styles.chatBoard}>
            <div className={styles.inner}>
                <ChatMessagesList messages={messages} />
            </div>
        </div>
    );
};
export default ChatBoard;
