import React from 'react';
import Input from '../../shared/ui/Input';
import { InputFeature } from '../../shared/ui/Input/Input.types';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';
import styles from './ProfileFormPass.module.css';
import Button from '../../shared/ui/Button';

export function ProfileFormPass() {
    return (
        <form className={styles.profileForm}>
            <Input
                feature={InputFeature.DYNAMIC_PLACEHOLDER}
                type="password"
                customPlaceholder="Старый пароль"
                className={styles.input}
            />
            <Input
                feature={InputFeature.DYNAMIC_PLACEHOLDER}
                type="password"
                customPlaceholder="Новый пароль"
                className={styles.input}
            />
            <Input
                feature={InputFeature.DYNAMIC_PLACEHOLDER}
                type="password"
                customPlaceholder="Повторите пароль"
                className={styles.input}
            />
            <Button
                theme={ButtonTheme.GREEN}
                size={ButtonSize.M}
                type="submit"
                className={styles.button}
            >
                Сохранить
            </Button>
        </form>
    );
}
