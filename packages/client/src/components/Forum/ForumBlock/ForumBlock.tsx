import React, {
    ChangeEventHandler,
    FC, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import styles from './ForumBlock.module.css';
import ForumItem from '../ForumItem';
import Pagination from '../../Pagination';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getCountThemes, getThemeList } from '../../../redux/actionCreators/forum';

const ForumBlock: FC = () => {
    const dispatch = useDispatch();
    const forumThemes = useTypedSelector((state) => state.forum.themes);
    const countThemes = useTypedSelector((state) => state.forum.countThemes);
    const [PAGE_SIZE, setPageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCountThemes());
    }, []);

    useEffect(() => {
        if (countThemes !== 0) {
            dispatch(getThemeList(currentPage, PAGE_SIZE));
        }
    }, [countThemes, PAGE_SIZE, currentPage]);
    const selectChangeHandle:ChangeEventHandler<HTMLSelectElement> = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div className={styles.selectCountThemes}>
                <label htmlFor="pagesize">
                    Количество тем на странице:
                    {' '}
                    {' '}
                    <select name="pagesize" value={PAGE_SIZE} onChange={selectChangeHandle}>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                    </select>
                </label>
            </div>
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
                    totalCount={countThemes}
                    pageSize={PAGE_SIZE}
                    onPageChange={setCurrentPage}
                />
            </nav>
        </>
    );
};
export default ForumBlock;
