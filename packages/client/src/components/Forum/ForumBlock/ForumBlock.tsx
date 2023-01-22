import {
    FC, useEffect, useRef, useState,
} from 'react';
import { TForumTheme } from './ForumBlock.types';

import styles from './ForumBlock.module.css';
import ForumItem from '../ForumItem';
import Pagination from '../../Pagination';
import { usePaginationItems } from '../../../hooks/usePaginationItems';

const ForumBlock: FC = () => {
    const [forumThemes, setForumThemes] = useState<TForumTheme[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = useRef<number>(7);

    //   примерный ответ с бэка
    const EXAMPLE_FORUM_THEMES = useRef<TForumTheme[]>([
        {
            themeId: 10,
            createdById: 4,
            countMsg: 22,
            date: new Date(),
            themeName: 'my new theme',
        },
        {
            themeId: 11,
            createdById: 4,
            countMsg: 12,
            date: new Date(),
            themeName: 'my new second theme',
        },
        {
            themeId: 12,
            createdById: 4,
            countMsg: 22,
            date: new Date(),
            themeName: 'my new theme',
        },
        {
            themeId: 13,
            createdById: 4,
            countMsg: 12,
            date: new Date(),
            themeName: 'my new second theme',
        },
        {
            themeId: 14,
            createdById: 2,
            countMsg: 2,
            date: new Date(),
            themeName: 'my new third theme',
        },
        {
            themeId: 15,
            createdById: 4,
            countMsg: 22,
            date: new Date(),
            themeName: 'my new theme',
        },
        {
            themeId: 16,
            createdById: 4,
            countMsg: 12,
            date: new Date(),
            themeName: 'my new second theme',
        },
        {
            themeId: 17,
            createdById: 2,
            countMsg: 2,
            date: new Date(),
            themeName: 'my new third theme',
        },
    ]);

    const currentPaginationItems = usePaginationItems(
        EXAMPLE_FORUM_THEMES.current,
        currentPage,
        PAGE_SIZE.current,
    );

    useEffect(() => {
        setForumThemes(currentPaginationItems);
    }, [currentPaginationItems]);

    return (
        <>

            <ul className={styles.forumBlock}>
                {forumThemes.map((theme) => {
                    if (theme === null) {
                        return;
                    }
                    const {
                        themeId, createdById, date, countMsg, themeName,
                    } = theme;

                    /* eslint-disable-next-line */
                    return (
                        <ForumItem
                            key={themeId}
                            themeId={themeId}
                            createdById={createdById}
                            date={date}
                            countMsg={countMsg}
                            themeName={themeName}
                        />
                    );
                })}
            </ul>

            <nav className={styles.paginationNav}>
                <Pagination
                    currentPage={currentPage}
                    totalCount={EXAMPLE_FORUM_THEMES.current.length}
                    pageSize={PAGE_SIZE.current}
                    onPageChange={setCurrentPage}
                />
            </nav>
        </>
    );
};
export default ForumBlock;
