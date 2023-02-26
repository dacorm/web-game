import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ForumThemeHeader from '../../components/Forum/ForumThemeHeader';
import ForumThemeMessages from '../../components/Forum/ForumThemeMessages';
import ForumThemeTextArea from '../../components/Forum/ForumThemeTextArea';

import styles from './ForumTheme.module.css';
import { TTheme } from './ForumTheme.types';
import { createMes, getMessages } from '../../redux/actionCreators/forum';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const ForumTheme = () => {
    const { themeId } = useParams();
    const dispatch = useDispatch();
    console.log('THEMEID', themeId);
    const [theme, setTheme] = useState<TTheme>(null);
    const currentMessages = useTypedSelector((state) => state.forum.currentMessages);
    console.log('currentMessages', currentMessages);
    // в юрл получаем айди темы и будем ее подтягивать с бэка с +- такими данными:
    const EXAMPLE_THEME = useRef<TTheme>({
        themeId: Number(themeId),
        userId: 2,
        themeName: 'Тестовая тема',
    });

    useEffect(() => {
        setTheme(EXAMPLE_THEME.current);
    }, []);

    useEffect(() => {
        dispatch(getMessages(themeId));
    }, [themeId]);

    return (
        <div className={styles.forumTheme}>
            {!!theme && (
                <ForumThemeHeader
                    themeName={theme.themeName}
                    userId={theme.userId}
                />
            )}
            {!!theme && <ForumThemeMessages messages={currentMessages} />}
            <div className={styles.formWrapper}>
                <ForumThemeTextArea themeId={themeId} />
            </div>
        </div>
    );
};

export default ForumTheme;
