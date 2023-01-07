import { useEffect, useMemo, useRef } from 'react';
import { Canvas } from './helpers/Canvas';
import { createBoard } from '../BoardStage/helpers/createBoard';
import { boardStageData } from '../BoardStage/helpers/boardStageData';

type Props = { width: number; height: number }

// Пассивный канвас. На нем будет рисоваться вся статичная графика и обновляться не будет. Нарисовали, забыли
export const staticCanvas = ({ width, height }: Props) => {
    const ref = useRef<Canvas>(new Canvas({ width, height }));
    const stage = useMemo(boardStageData, []);

    useEffect(() => {
        ref.current.setSize(width, height);
        createBoard(ref.current, stage);
    }, [width, height]);

    return ref.current;
};
