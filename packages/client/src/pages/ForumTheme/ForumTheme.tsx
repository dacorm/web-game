import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ForumThemeHeader from '../../components/Forum/ForumThemeHeader';
import ForumThemeMessages from '../../components/Forum/ForumThemeMessages';
import ForumThemeTextArea from '../../components/Forum/ForumThemeTextArea';

import style from './ForumTheme.module.css';
import { TTheme } from './ForumTheme.types';

const ForumTheme = () => {
    const { id_theme } = useParams();
    const [theme, setTheme] = useState<TTheme>(null);

    // в юрл получаем айди темы и будем ее подтягивать с бэка с +- такими данными:
    const EXAMPLE_THEME = useRef<TTheme>({
        id_theme: Number(id_theme),
        id_user: 2,
        theme_name: 'Тестовая тема',
        messages: [
            {
                id_msg: 1,
                text: 'Check checkkkkkffffffffffffdddddddd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quasi voluptas explicabo aliquam pariatur libero earum cum sequi voluptate quo, et ducimus, deserunt eligendi rerum laborum ratione velit officia vero? ffffffffffk check!',
                author_id: 1,
                date: new Date(),
            },
            {
                id_msg: 2,
                text: '22222 checkkkkkk check!',
                author_id: 2,
                date: new Date(),
            },
            {
                id_msg: 1,
                text: 'Check checkkkkkffffffffffffdddddddd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quasi voluptas explicabo aliquam pariatur libero earum cum sequi voluptate quo, et ducimus, deserunt eligendi rerum laborum ratione velit officia vero? ffffffffffk check!',
                author_id: 1,
                date: new Date(),
            },
            {
                id_msg: 2,
                text: '22222 checkkkkkk check!',
                author_id: 2,
                date: new Date(),
            },
            {
                id_msg: 1,
                text: 'Check checkkkkkffffffffffffdddddddd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quasi voluptas explicabo aliquam pariatur libero earum cum sequi voluptate quo, et ducimus, deserunt eligendi rerum laborum ratione velit officia vero? ffffffffffk check!',
                author_id: 1,
                date: new Date(),
            },
            {
                id_msg: 2,
                text: '22222 checkkkkkk check!',
                author_id: 2,
                date: new Date(),
            },
            {
                id_msg: 1,
                text: 'Check checkkkkkffffffffffffdddddddd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam quasi voluptas explicabo aliquam pariatur libero earum cum sequi voluptate quo, et ducimus, deserunt eligendi rerum laborum ratione velit officia vero? ffffffffffk check!',
                author_id: 1,
                date: new Date(),
            },
            {
                id_msg: 2,
                text: '22222 checkkkkkk check!',
                author_id: 2,
                date: new Date(),
            },
        ],
    });

    useEffect(() => {
        setTheme(EXAMPLE_THEME.current);
    }, []);

    return (
        <div className={style.forum_theme}>
            {theme && (
                <ForumThemeHeader
                    theme_name={theme.theme_name}
                    id_user={theme.id_user}
                />
            )}
            {theme && <ForumThemeMessages messages={theme.messages} />}
            <div className={style['form-wrapper']}>
                <ForumThemeTextArea />
            </div>
        </div>
    );
};

export default ForumTheme;
