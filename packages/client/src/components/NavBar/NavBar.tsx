import React from 'react';
import { useSelector } from 'react-redux';
import styles from './NavBar.module.css';
import { NavBarItem } from '../NavBarItem';
import { NavBarProfile } from '../NavBarProfile';
import { NavBarLogo } from '../NavBarLogo';
import { NavbarItemProps } from '../NavBarItem/NavBarItem.types';
import { NavBarProps } from './NavBar.types';
import { ROUTES } from '../../layout/RouterLayout/RouterConst';
import { getUserName } from '../../redux/userReducer/userSelectors';

const menuItems: NavbarItemProps[] = [
    { id: 1, path: ROUTES.MAIN, title: 'Поиск игры' },
    { id: 2, path: ROUTES.FORUM, title: 'Форум' },
    { id: 3, path: ROUTES.LEADER, title: 'Лидерборд' },
];

export function NavBar({ userLogo }: NavBarProps) {
    const userName = useSelector(getUserName);

    return (
        <nav className={styles.navbar}>
            <NavBarLogo />
            <ul className={styles.menu}>
                {menuItems.map((item) => (
                    <NavBarItem
                        path={item.path}
                        title={item.title}
                        id={item.id}
                        key={item.id}
                    />
                ))}
            </ul>
            <NavBarProfile userLogo={userLogo} userName={userName} />
        </nav>
    );
}
