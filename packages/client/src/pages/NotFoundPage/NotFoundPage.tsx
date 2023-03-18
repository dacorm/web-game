import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import Button from '../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/');
    };

    return (
        <div className={styles.layout}>
            Что-то пошло не так :с
            <Button size={ButtonSize.M} theme={ButtonTheme.GREEN} onClick={clickHandler}>Вернуться на главную</Button>
        </div>
    );
};
