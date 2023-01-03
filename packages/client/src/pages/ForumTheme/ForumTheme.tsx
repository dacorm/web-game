import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ForumThemeHeader from '../../components/Forum/ForumThemeHeader';
import ForumThemeMessages from '../../components/Forum/ForumThemeMessages';
import ForumThemeTextArea from '../../components/Forum/ForumThemeTextArea';

import styles from './ForumTheme.module.css';
import { TTheme } from './ForumTheme.types';

const ForumTheme = () => {
    const { themeId } = useParams();
    const [theme, setTheme] = useState<TTheme>(null);

    // в юрл получаем айди темы и будем ее подтягивать с бэка с +- такими данными:
    const EXAMPLE_THEME = useRef<TTheme>({
        themeId: Number(themeId),
        userId: 2,
        themeName: 'Тестовая тема',
        messages: [
            {
                msgId: 1,
                text: 'uptas explicabo aliquam pariatur ratione velit officia vero? ffffffffffk check!',
                authorId: 1,
                date: new Date(),
            },
            {
                msgId: 2,
                text: '22222 checkkkkkk check!',
                authorId: 2,
                date: new Date(),
            },
            {
                msgId: 3,
                text: 'uptas explicabo aliquam pariatur ratione velit officia vero? ffffffffffk check!',
                authorId: 1,
                date: new Date(),
            },
            {
                msgId: 4,
                text: '22222 checkkkkkk check!',
                authorId: 2,
                date: new Date(),
            },
            {
                msgId: 5,
                text: 'uptas explicabo aliquam pariatur ratione velit officia vero? ffffffffffk check!',
                authorId: 1,
                date: new Date(),
            },
            {
                msgId: 6,
                text: '22222 checkkkkkk check!',
                authorId: 2,
                date: new Date(),
            },
            {
                msgId: 7,
                text: 'uptas explicabo aliquam pariatur ratione velit officia vero? ffffffffffk check!',
                authorId: 1,
                date: new Date(),
            },
            {
                msgId: 8,
                text: '22222 checkkkkkk check!',
                authorId: 2,
                date: new Date(),
            },
        ],
    });

    useEffect(() => {
        setTheme(EXAMPLE_THEME.current);
    }, []);

    return (
        <div className={styles.forumTheme}>
            {!!theme && (
                <ForumThemeHeader
                    themeName={theme.themeName}
                    userId={theme.userId}
                />
            )}
            {!!theme && <ForumThemeMessages messages={theme.messages} />}
            <div className={styles.formWrapper}>
                <ForumThemeTextArea />
            </div>
        </div>
    );
};

export default ForumTheme;
