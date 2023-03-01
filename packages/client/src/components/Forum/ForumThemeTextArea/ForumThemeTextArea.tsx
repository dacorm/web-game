import React, { ChangeEventHandler, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import styles from './ForumThemeTextArea.module.css';
import { createMes } from '../../../redux/actionCreators/forum';
import { Dispatcher } from '../../../redux/store';
import { ForumThemeTextAreaProps } from './ForumThemeTextArea.types';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const ForumThemeTextArea: FC<ForumThemeTextAreaProps> = ({ themeId }) => {
    const dispatch = useDispatch<Dispatcher>();
    const currentUser = useTypedSelector((state) => state.user.id);
    const [text, setText] = useState('');

    const mesHandler = (e:React.MouseEvent) => {
        e.preventDefault();
        if (text.length !== 0) {
            dispatch(createMes(themeId, text, currentUser));
        }
    };

    const textChangeHandler:ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const target = e.target as HTMLTextAreaElement;
        setText(target.value);
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
