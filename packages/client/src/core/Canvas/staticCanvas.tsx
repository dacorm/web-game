import { useEffect, useRef } from 'react';
import { Canvas } from './helpers/Canvas';
import { createBoard } from './helpers/createBoard';
import { resetBoard } from './helpers/resetBoard';

type Props = { width: number; height: number }

// Пассивный канвас. На нем будет рисоваться вся статичная графика и обновляться не будет. Нарисовали, забыли
export const staticCanvas = ({ width, height }: Props) => {
    const ref = useRef<Canvas>(new Canvas({ width, height }));

    useEffect(() => {
        ref.current.setSize(width, height);
        resetBoard();
        createBoard(ref.current);
    }, [width, height]);

    return ref.current;
};
