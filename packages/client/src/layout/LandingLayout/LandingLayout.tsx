import { FC } from 'react';
import { Outlet } from 'react-router';

import style from './LandingLayout.module.css';

import LandingStub from '../../components/Landing/LandingStub';

const LandingLayout: FC = () => (
    <main className={style.main}>
        <LandingStub>
            <Outlet />
        </LandingStub>
    </main>
);

export default LandingLayout;
