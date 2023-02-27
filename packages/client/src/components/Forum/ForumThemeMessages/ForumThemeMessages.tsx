import { FC, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styles from './ForumThemeMessages.module.css';
import { ForumThemeMessagesProps } from './ForumThemeMessages.types';
import ForumThemeMessageItem from '../ForumThemeMessageItem';
import ErrorFallback from '../../ErrorFallback';

const ForumThemeMessages: FC<ForumThemeMessagesProps> = ({ messages }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    // временный костыль для скрола сообщений в самый низ  при открытии форума
    useEffect(() => {
        setTimeout(
            () => {
                if (wrapperRef.current) {
                    (wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight);
                }
            },
            10,
        );
    }, []);

    return (
        <div ref={wrapperRef} className={styles.messagesWrapper}>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
            >
                <ul className="messages">
                    {messages.map(({
                        msgId, text, authorId, createdAt,
                    }) => (
                        <ForumThemeMessageItem
                            key={msgId}
                            msgId={msgId}
                            text={text}
                            authorId={authorId}
                            createdAt={createdAt}
                        />
                    ))}
                </ul>
            </ErrorBoundary>
        </div>
    );
};

export default ForumThemeMessages;
