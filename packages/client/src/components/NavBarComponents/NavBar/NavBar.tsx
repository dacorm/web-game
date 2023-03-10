import React from 'react';
import styles from './NavBar.module.css';
import { NavBarItem } from '../NavBarItem';
import { NavBarProfile } from '../NavBarProfile';
import { NavBarLogo } from '../NavBarLogo';
import { NavbarItemProps } from '../NavBarItem/NavBarItem.types';
import { NavBarProps } from './NavBar.types';
import { ROUTES } from '../../../layout/RouterLayout/RouterConst';
import Button from '../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../shared/ui/Button/Button.types';
import { useTheme } from '../../../hooks/useTheme';

const menuItems: NavbarItemProps[] = [
    { id: 1, path: ROUTES.GAME_SEARCH, title: 'Поиск игры' },
    { id: 2, path: ROUTES.FORUM, title: 'Форум' },
    { id: 3, path: ROUTES.LEADER, title: 'Лидерборд' },
    { id: 4, path: ROUTES.LANDING, title: 'Описание' },
];

export function NavBar({ userLogo, userName }: NavBarProps) {
    const { toggleTheme } = useTheme();

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
            <Button size={ButtonSize.S} theme={ButtonTheme.GREEN} onClick={toggleTheme}>Сменить тему</Button>
            <NavBarProfile userLogo={userLogo} userName={userName} />
        </nav>
    );
}
