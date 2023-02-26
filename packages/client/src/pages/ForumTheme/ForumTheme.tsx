import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ForumThemeHeader from '../../components/Forum/ForumThemeHeader';
import ForumThemeMessages from '../../components/Forum/ForumThemeMessages';
import ForumThemeTextArea from '../../components/Forum/ForumThemeTextArea';

import styles from './ForumTheme.module.css';
import { getMessages, getTheme } from '../../redux/actionCreators/forum';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const ForumTheme = () => {
    const { themeId } = useParams();
    const dispatch = useDispatch();
    console.log('THEMEID', themeId);
    const currentTheme = useTypedSelector((state) => state.forum.currentTheme);
    console.log('currentTheme', currentTheme);
    const currentMessages = useTypedSelector((state) => state.forum.currentMessages);
    console.log('currentMessages', currentMessages);
    // в юрл получаем айди темы и будем ее подтягивать с бэка с +- такими данными:

    useEffect(() => {
        dispatch(getTheme(themeId));
        dispatch(getMessages(themeId));
    }, [themeId]);

    return (
        <div className={styles.forumTheme}>
            {!!currentTheme && (
                <ForumThemeHeader
                    themeName={currentTheme.themeName}
                    userId={currentTheme.createdById}
                />
            )}
            {!!currentTheme && <ForumThemeMessages messages={currentMessages} />}
            <div className={styles.formWrapper}>
                <ForumThemeTextArea themeId={themeId} />
            </div>
        </div>
    );
};

export default ForumTheme;
