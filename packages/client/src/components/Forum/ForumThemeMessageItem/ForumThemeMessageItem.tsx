import {
    FC, useEffect, useRef, useState,
} from 'react';
import { TThemeMessage } from '../../../pages/ForumTheme/ForumTheme.types';
import { TUser } from '../../../types/global.types';
import Button from '../../../shared/ui/Button';
import {
    ButtonColorText,
    ButtonSize,
    ButtonTheme,
} from '../../../shared/ui/Button/Button.types';

import defaultAvatar from '../../../assets/img/defaultUserAvatar.png';
import styles from './ForumThemeMessageItem.module.css';

const ForumThemeMessageItem: FC<TThemeMessage> = ({
    msgId,
    text,
    authorId,
    createdAt,
}) => {
    const [author, setAuthor] = useState<TUser | null>(null);
    const EXAMPLE_USER = useRef<TUser>({
        id_user: 1,
        name: 'userName1',
        avatar: null,
    });

    useEffect(() => {
        setAuthor(EXAMPLE_USER.current);
    }, []);

    return (
        <li
            className={styles.messageItem}
            data-id-msg={msgId}
            data-id-author={authorId}
        >
            <div className={styles.author}>
                <img
                    src={author?.avatar || defaultAvatar}
                    alt="avatar"
                    className={styles.avatar}
                />
                <div className={styles.name}>{author?.name}</div>
                <time className={styles.date}>
                    {createdAt.toLocaleString().slice(0, 17)}
                </time>
            </div>
            <div className={styles.message}>
                <div className={styles.text}>{text}</div>
                <div className={styles.button}>
                    <Button
                        theme={ButtonTheme.TRANSPARENT}
                        colorText={ButtonColorText.BLUE}
                        size={ButtonSize.S}
                    >
                        Ответить
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default ForumThemeMessageItem;
