import { FC } from 'react';
import { Outlet } from 'react-router';
import MenuStub from '../../components/MenuStub';
import { NavBar } from '../../components/NavBar';

import styles from './MenuLayout.module.css';
import defaultAvatar from '../../assets/img/defaultUserAvatar.png';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const MenuLayout: FC = () => {
    const userState = useTypedSelector((state) => state.user);
    const userLogo = userState.avatar ? userState.avatar : defaultAvatar;
    const userName = userState.userName ? userState.userName : 'SomeUser';
    return (
        <>
            <NavBar userLogo={userLogo} userName={userName} />
            <main className={styles.main}>
                <MenuStub>
                    <Outlet />
                </MenuStub>
            </main>
        </>
    );
};

export default MenuLayout;
