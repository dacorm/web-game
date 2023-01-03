import { useEffect, useState } from 'react';
import { TForumTheme } from '../components/Forum/ForumBlock/ForumBlock.types';

// сюда добавлять типы массивов айтемов, которые фильтруем
type TItems = TForumTheme[]

// получаем отфильтрованный массив айтемов, который нужно будет отрендерить
// в зависимости от текущей страницы и ее вместимости
export const usePaginationItems = (
    items: TItems,
    currentPage: number,
    pageSize: number,
) => {
    const [paginationItems, setPaginationItems] = useState<TItems>([]);

    useEffect(() => {
        const currentPaginationItems = [];
        for (
            let i = currentPage * pageSize - pageSize;
            i < currentPage * pageSize;
            i += 1
        ) {
            currentPaginationItems.push(items[i] || null);
        }
        setPaginationItems(currentPaginationItems);
    }, [currentPage, items, pageSize]);

    return paginationItems;
};
