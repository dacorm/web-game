import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';

import styles from './ForumThemeTextArea.module.css';
import { createMes } from '../../../redux/actionCreators/forum';

const ForumThemeTextArea: FC = ({ themeId }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const mesHandler = (e) => {
        console.log(themeId);
        e.preventDefault();
        dispatch(createMes(themeId, text, 2));
    };

    const textChangeHandler = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    return (
        <form action="#" className={styles.form}>
            <textarea
                name="forum-msg"
                id="forum-msg"
                placeholder="Введите сообщение"
                className={styles.textarea}
                value={text}
                onChange={textChangeHandler}
            />
            <div className={styles.button}>
                <Button theme={ButtonTheme.GREEN} size={ButtonSize.X} onClick={mesHandler}>
                    Отправить
                </Button>
            </div>
        </form>
    );
};

export default ForumThemeTextArea;
