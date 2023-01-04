import { FC } from 'react';
import { Outlet } from 'react-router';
import styles from './GameLayout.module.css';

const GameLayout: FC = () => (
    <main className={styles.main}>
        <Outlet />
    </main>
);

export default GameLayout;
