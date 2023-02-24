import {
    FC, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { TForumTheme } from './ForumBlock.types';

import styles from './ForumBlock.module.css';
import ForumItem from '../ForumItem';
import Pagination from '../../Pagination';
import { usePaginationItems } from '../../../hooks/usePaginationItems';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getThemeList, setThemeList } from '../../../redux/actionCreators/forum';

const ForumBlock: FC = () => {
    const forumThemes = useTypedSelector((state) => state.forum.themes);
    const dispatch = useDispatch();
    console.log('THEMES', forumThemes);

    // const [forumThemes, setForumThemes] = useState<TForumTheme[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = useRef<number>(7);
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

    useEffect(() => {
        // dispatch(setThemeList(THEMES));
        dispatch(getThemeList());
    }, []);

    return (
        <>

            <ul className={styles.forumBlock}>
                {forumThemes.map((theme) => {
                    if (theme === null) {
                        return;
                    }
                    const {
                        themeId, createdById, createdAt, countMsg, themeName,
                    } = theme;

                    /* eslint-disable-next-line */
                    return (
                        <ForumItem
                            key={themeId}
                            themeId={themeId}
                            createdById={createdById}
                            date={createdAt}
                            countMsg={countMsg}
                            themeName={themeName}
                        />
                    );
                })}
            </ul>

            <nav className={styles.paginationNav}>
                <Pagination
                    currentPage={currentPage}
                    totalCount={5}
                    pageSize={PAGE_SIZE.current}
                    onPageChange={setCurrentPage}
                />
            </nav>
        </>
    );
};
export default ForumBlock;
