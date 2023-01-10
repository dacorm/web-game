import { FC } from 'react';
import { Outlet } from 'react-router';

import style from './LandingLayout.module.css';

import LandingStub from '../../components/LandingStub';
import MenuHeader from '../../components/MenuHeader';

const LandingLayout: FC = () => (
    <>
        {/* <MenuHeader text="Описание" /> */}
        <main className={style.main}>
            <LandingStub>
                <Outlet />
            </LandingStub>
        </main>
    </>
);

export default LandingLayout;
