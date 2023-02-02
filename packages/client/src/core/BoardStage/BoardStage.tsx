import React, {
    FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { staticCanvas } from '../Canvas/staticCanvas';
import { activeCanvas } from '../Canvas/activeCanvas';
import Cube from '../../components/Game/Cube';
import styles from './BoardStage.module.css';
import { useBoard } from './BoardProvider';
import Modal from '../../shared/ui/Modal';
import { ROUTES } from '../../constants';
import Button from '../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types';
import {
    rollTheDiceTrue, setCurrentPlayer, turnStart,
} from '../../redux/actionCreators/game';
import { BoardStageProps } from './BoardStage.types';
import {
    getActionStarting, getCurrentPlayer, getTurnCompleted,
} from '../../redux/reducers/gameReducer/gameSelector';
import TitleBoard from '../../components/Game/TitleBoard';
import Action from '../../components/Game/Action';

export const BoardStage: FC<BoardStageProps> = React.memo(({ players }: BoardStageProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const rect = useResizeObserver(ref);
    const { random } = useBoard();

    const [isGameStarting, setIsGameStarting] = useState<boolean>(false);
    const [modals, setModals] = useState({
        showWinModal: false,
        showLoseModal: false,
    });

    const dispatch = useDispatch<Dispatch>();
    const currentPlayer = useSelector(getCurrentPlayer);
    const actionStarting = useSelector(getActionStarting);
    const turnComleted = useSelector(getTurnCompleted);

    const closeWindModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showWinModal: false }));
    }, []);
    const closeLosedModal = useCallback(() => {
        setModals((prev) => ({ ...prev, showLoseModal: false }));
    }, []);

    /**  Завершение хода */
    const completeTheMove = useCallback(() => {
        console.log('Ход завершён');
        dispatch(setCurrentPlayer());
        dispatch(rollTheDiceTrue());
        dispatch(turnStart());
    }, []);

    /** инициализация старта игры */
    const initStartGame = useCallback(() => {
        dispatch(setCurrentPlayer());
        dispatch(rollTheDiceTrue());
        console.log('Игра запущена');
    }, []);

    const containerSizes = useMemo(
        () => ({ width: rect?.width || 0, height: rect?.height || 0 }),
        [rect],
    );
    const staticLayer = staticCanvas(containerSizes);
    const activeLayer = activeCanvas({
        ...containerSizes,
        squares: random,
        players,
    });

    useEffect(() => {
        ref.current?.prepend(staticLayer.canvas, activeLayer.canvas);
    }, []);

    // вызываем инициализацию стара игры
    useEffect(() => {
        if (!isGameStarting && players) {
            setIsGameStarting(true);
            initStartGame();
        }
    }, [players]);

    return (
        <>
            <div className={styles.wrapper} ref={ref}>
                {/* todo: вынести в компонент */}
                <div className={styles.innerBoard}>
                    <TitleBoard currentPlayer={currentPlayer} />
                    <div className={styles.ContentBoard}>
                        {actionStarting
                            ? <Action />
                            : (
                                <div className={styles.controller}>
                                    <Cube />
                                    {turnComleted && (
                                        <Button
                                            size={ButtonSize.M}
                                            theme={ButtonTheme.RED}
                                            onClick={completeTheMove}
                                        >
                                            Завершить ход

                                        </Button>
                                    )}
                                </div>
                            )}
                    </div>
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
