import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { TForumTheme } from '../ForumBlock/ForumBlock.types';

import style from './ForumItem.module.css';

const ForumItem: FC<TForumTheme> = ({
    id_theme,
    created_by_id,
    date,
    count_msg,
    name_theme,
}) => (
    <li className={style.item} data-id-theme={id_theme}>
        <Link to={`${ROUTES.FORUM}/${id_theme}`}>
            <div className={style['item-info']}>
                <div className={style['item-author']}>
                    {created_by_id}
                    ,
                    {' '}
                </div>
                <div className={style['item-date']}>{date.toLocaleString()}</div>
            </div>
            <div className={style['item-inner']}>
                <div className={style['item-name']}>{name_theme}</div>
                <div className={style['item-count-msg']}>
                    сообщений:
                    {' '}
                    {count_msg}
                </div>
            </div>
        </Link>
    </li>
);

export default ForumItem;
