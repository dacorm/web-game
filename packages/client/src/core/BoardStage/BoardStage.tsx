import React, {
    FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { staticCanvas } from '../Canvas/staticCanvas';
import { activeCanvas } from '../Canvas/activeCanvas';
import Cube from '../../components/Cube';
import styles from './BoardStage.module.css';
import { useBoard } from './BoardProvider';
import Modal from '../../shared/ui/Modal';
import { ROUTES } from '../../constants';

export const BoardStage: FC = React.memo(() => {
    const ref = useRef<HTMLDivElement>(null);
    const rect = useResizeObserver(ref);
    const { random } = useBoard();

    const [modals, setModals] = useState({
        showWinModal: false,
        showLoseModal: false,
    });

    const closeWindModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showWinModal: false }));
    }, []);
    const closeLosedModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showLoseModal: false }));
    }, []);

    const containerSizes = useMemo(
        () => ({ width: rect?.width || 0, height: rect?.height || 0 }),
        [rect],
    );
    const staticLayer = staticCanvas(containerSizes);
    const activeLayer = activeCanvas({
        ...containerSizes,
        squares: random,
    });

    useEffect(() => {
        ref.current?.prepend(staticLayer.canvas, activeLayer.canvas);
    }, []);

    return (
        <>
            <div className={styles.wrapper} ref={ref}>
                <div className={styles.wrapper}>
                    <Cube />
                </div>
            </div>
            <Modal
                title="Поздравляем!"
                onClose={closeWindModal}
                isShow={modals.showWinModal}
            >
                <div className={styles.winWrapper}>
                    <div className={styles.winText}>
                        Достигнут статуса монополиста
                        <br />
                        <br />
                        {' '}
                        Вы выиграли!
                    </div>
                    <Link className={styles.winBtn} to={ROUTES.MAIN}>Вернуться в главное меню</Link>
                </div>
            </Modal>
            <Modal
                title="Увы..."
                isShow={modals.showLoseModal}
                onClose={closeLosedModal}
            >
                <div className={styles.loseWrapper}>
                    <div className={styles.loseText}>
                        Достигнут статуса банкрота
                        <br />
                        <br />
                        {' '}
                        Вы проиграли!
                    </div>

                    <Link className={styles.loseBtn} to={ROUTES.MAIN}>Вернуться в главное меню</Link>

                </div>
            </Modal>
        </>
    );
});
