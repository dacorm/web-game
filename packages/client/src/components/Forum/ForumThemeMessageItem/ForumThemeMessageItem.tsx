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
import style from './ForumThemeMessageItem.module.css';

const ForumThemeMessageItem: FC<TThemeMessage> = ({
    //   id_msg,
    text,
    //   author_id,
    date,
}) => {
    const [author, setAuthor] = useState<TUser>(null);
    const EXAMPLE_USER = useRef<TUser>({
        id_user: 1,
        name: 'userName1',
        avatar: null,
    });

    useEffect(() => {
        setAuthor(EXAMPLE_USER.current);
    }, []);

    return (
        <li className={style['message-item']}>
            <div className={style.author}>
                <img
                    src={author?.avatar || defaultAvatar}
                    alt="avatar"
                    className={style.avatar}
                />
                <div className={style.name}>{author?.name}</div>
                <time className={style.date}>{date.toLocaleString().slice(0, 17)}</time>
            </div>
            <div className={style.message}>
                <div className={style.text}>{text}</div>
                <div className={style.button}>
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
