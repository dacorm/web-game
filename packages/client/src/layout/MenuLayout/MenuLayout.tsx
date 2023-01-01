import { FC } from 'react';
import { Outlet } from 'react-router';
import MenuStub from '../../components/MenuStub';
import { NavBar } from '../../components/NavBar';

import style from './MenuLayout.module.css';
import userLogo from '../../assets/img/userLogo.png';

const MenuLayout: FC = () => (
    <>
        <NavBar userLogo={userLogo} userName="SomeUser" />
        <main className={style.main}>
            <MenuStub>
                <Outlet />
            </MenuStub>
        </main>
    </>
);

export default MenuLayout;
