import { FC } from 'react';
import { TThemeMessage } from '../../../pages/ForumTheme/ForumTheme.types';
import Button from '../../../shared/ui/Button';
import {
    ButtonColorText,
    ButtonSize,
    ButtonTheme,
} from '../../../shared/ui/Button/Button.types';

import defaultAvatar from '../../../assets/img/defaultUserAvatar.png';
import styles from './ForumThemeMessageItem.module.css';
import { UserURL } from '../../../redux/types/userReducer.types';

const ForumThemeMessageItem: FC<TThemeMessage> = ({
    msgId,
    text,
    authorId,
    createdAt,
    login,
    avatar,
}) => (
    <li
        className={styles.messageItem}
        data-id-msg={msgId}
        data-id-author={authorId}
    >
        <div className={styles.author}>
            <img
                src={(avatar === null) ? defaultAvatar : UserURL.BASE_AVATAR_URL + avatar}
                alt="avatar"
                className={styles.avatar}
            />
            <div className={styles.name}>
                {login}
            </div>
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

export default ForumThemeMessageItem;
