import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './NavBarProfileDropMenu.module.css';
import { ROUTES } from '../../../layout/RouterLayout/RouterConst';
import { Dispatcher } from '../../../redux/store';
import { logoutThunk } from '../../../redux/actionCreators/user';

interface NavBarProfileDropMenuProps {
  drop: boolean
  onClick: () => void
}

export function NavBarProfileDropMenu({
    drop,
    onClick,
}: NavBarProfileDropMenuProps) {
    const style = drop
        ? `${styles.dropdown} ${styles.dropdownActive}`
        : `${styles.dropdown}`;
    const dispatch = useDispatch<Dispatcher>();

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    return (
        <ul className={style} onClick={onClick}>
            <li className={styles.dropdownItem}>
                <Link to={ROUTES.PROFILE}>Профиль</Link>
            </li>
            <li className={styles.dropdownItem} onClick={handleLogout}>
                Выйти
            </li>
        </ul>
    );
}
