import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';
import Input from '../../shared/ui/Input';
import { InputFeature } from '../../shared/ui/Input/Input.types';
import Button from '../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';
import { FormProps } from './Form.types';
import {
    loginThunk,
    registerUserThunk,
    loginOAuthPart1Thunk,
} from '../../redux/actionCreators/user';
import { Dispatcher } from '../../redux/store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ROUTES } from '../../constants';

export const Form: React.FC<FormProps> = ({ isAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const { loginError, isLoggedIn } = useTypedSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch<Dispatcher>();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isAuth) {
            dispatch(registerUserThunk(nickname, email, password));
            // navigate('/');
        }
        if (isAuth) {
            dispatch(loginThunk(nickname, password));
        }
    };
    const handleOAuthLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(loginOAuthPart1Thunk());
    };
    if (isLoggedIn) {
        navigate(ROUTES.GAME_SEARCH);
    }
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className={styles.title}>{isAuth ? 'Авторизация' : 'Регистрация'}</h1>
            <Input
                feature={InputFeature.WITH_LABEL}
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                label="Никнейм"
            />
            <Input
                feature={InputFeature.WITH_LABEL}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Пароль"
            />

            {!isAuth && (
                <>
                    <Input
                        feature={InputFeature.WITH_LABEL}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Электронная почта"
                    />
                    <Input
                        feature={InputFeature.WITH_LABEL}
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        label="Повторите пароль"
                    />
                </>
            )}
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <Button
                theme={ButtonTheme.GREEN}
                type="submit"
                className={styles.button}
                size={ButtonSize.M}
            >
                {isAuth ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            {isAuth && (
                <Button
                    theme={ButtonTheme.GREEN}
                    type="submit"
                    className={styles.button}
                    size={ButtonSize.M}
                    onClick={handleOAuthLogin}
                >
                    Войти с помощью яндекса
                </Button>
            )}
        </form>
    );
};
