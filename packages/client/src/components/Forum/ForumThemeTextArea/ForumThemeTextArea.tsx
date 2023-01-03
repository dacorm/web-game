import { FC } from 'react';
import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';

import styles from './ForumThemeTextArea.module.css';

const ForumThemeTextArea: FC = () => (
    <form action="#" className={styles.form}>
        <textarea
            name="forum-msg"
            id="forum-msg"
            placeholder="Введите сообщение"
            className={styles.textarea}
        />
        <div className={styles.button}>
            <Button theme={ButtonTheme.GREEN} size={ButtonSize.X}>
                Отправить
            </Button>
        </div>
    </form>
);

export default ForumThemeTextArea;
