import React, {
    FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { staticCanvas } from '../Canvas/staticCanvas';
import { activeCanvas } from '../Canvas/activeCanvas';
import styles from './BoardStage.module.css';
import {
    actionStart,
    addNewGameChatMessage,
    endGame,
    rollTheDiceFalse,
    rollTheDiceTrue, setAllPlayers, setCurrentPlayer, turnStart,
} from '../../redux/actionCreators/game';
import { BoardStageProps } from './BoardStage.types';
import {
    getActionStarting, getCurrentPlayer, getRollTheDice, getTurnCompleted,
} from '../../redux/reducers/gameReducer/gameSelector';
import ChatBoard from '../../components/Game/Chat/ChatBoard';
import ControllerBoard from '../../components/Game/ControllerBoard';
import { GreetModal } from './components/GreetModal';
import { PunishModal } from './components/PunishModal';
import { board } from '../../models/Board/Board';

export const BoardStage: FC<BoardStageProps> = React.memo(({ players }: BoardStageProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const rect = useResizeObserver(ref);
    const random = useSelector(getRollTheDice);

    const [isGameStarting, setIsGameStarting] = useState<boolean>(false);
    // todo: это состояние нужно перетащить в модалки
    const [modals, setModals] = useState({
        showWinModal: false,
        showLoseModal: false,
    });

    const dispatch = useDispatch<Dispatch>();
    const currentPlayer = useSelector(getCurrentPlayer);
    const actionStarting = useSelector(getActionStarting);
    const turnCompleted = useSelector(getTurnCompleted);

    const closeModal = useCallback((keyType: keyof typeof modals) => () => {
        setModals((prev) => ({ ...prev, [keyType]: false }));
    }, []);

    /**  Завершение хода */
    const completeTheMove = useCallback(() => {
        dispatch(addNewGameChatMessage(
            {
                playerName: currentPlayer.displayName,
                message: 'заканчивает свой ход',
            },
        ));
        dispatch(setCurrentPlayer());
        dispatch(rollTheDiceTrue());
        dispatch(turnStart());
    }, [currentPlayer]);

    useEffect(() => {
        if (!turnCompleted) {
            if (currentPlayer.prisoner) {
                dispatch(rollTheDiceFalse());
                dispatch(actionStart());
            }
        }
    }, [turnCompleted]);

    /** инициализация старта игры */
    const initStartGame = useCallback(() => {
        dispatch(setAllPlayers());
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

    const handlerActiveCanvasClicker = useCallback((e: MouseEvent) => {
        board.stage?.cells.forEach((cell) => {
            const { context, shape } = cell;
            if (shape?.pathShape && context?.isPointInPath(shape?.pathShape, e.offsetX * 2, e.offsetY * 2)) {
                cell.emit(e.type, e, cell);
            }
        });
    }, []);

    useEffect(() => {
        ref.current?.prepend(staticLayer.canvas, activeLayer.canvas);

        activeLayer.canvas.addEventListener('click', handlerActiveCanvasClicker);
        return () => {
            dispatch(endGame());
            activeLayer.canvas.removeEventListener('click', handlerActiveCanvasClicker);
        };
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
                    {/* <TitleBoard currentPlayer={currentPlayer} /> */}
                    <ControllerBoard turnComleted={turnCompleted} actionStarting={actionStarting} completeTheMove={completeTheMove} />
                    <ChatBoard />
                </div>
            </div>
            <GreetModal isShow={modals.showWinModal} onClose={closeModal('showWinModal')} />
            <PunishModal isShow={modals.showLoseModal} onClose={closeModal('showLoseModal')} />

        </>
    );
});
