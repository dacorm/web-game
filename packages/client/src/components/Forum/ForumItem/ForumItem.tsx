import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { TForumTheme } from '../ForumBlock/ForumBlock.types';

import styles from './ForumItem.module.css';

const ForumItem: FC<TForumTheme> = ({
    themeId,
    createdById,
    date,
    countMsg,
    themeName,
}) => (
    <li className={styles.item} data-id-theme={themeId}>
        <Link to={`${ROUTES.FORUM}/${themeId}`}>
            <div className={styles.itemInfo}>
                <div className={styles.itemAuthor}>
                    {createdById}
                    ,
                    {' '}
                </div>
                <div className={styles.itemDate}>{date.toLocaleString()}</div>
            </div>
            <div className={styles.itemInner}>
                <div className={styles.itemName}>{themeName}</div>
                <div className={styles.itemCountMsg}>
                    сообщений:
                    {countMsg}
                </div>
            </div>
        </Link>
    </li>
);

export default ForumItem;
