import { useEffect, useRef } from 'react';
import { Canvas } from './helpers/Canvas';
import { Player } from '../../models/Player/Player';
import board from '../../models/Board/Board';
import { activeCanvasProps, TAnimateFunc } from './types/activeCanvas.types';

// Активный канвас. На нем будет рисоваться вся графика при взаимодействии с пользователем
export const activeCanvas = ({ width, height, squares }: activeCanvasProps) => {
    // todo: добавить объект в стор
    const ref = useRef<Canvas>(new Canvas({ width, height }));
    const frame = useRef<number>(0);
    const player = useRef<Player>(new Player({
        canvas: ref.current,
        userId: 1,
    }));

    const context = ref.current.getContext();

    const stop = () => cancelAnimationFrame(frame.current);

    const animate:TAnimateFunc = (cell, updatedCurrentPos) => {
        frame.current = requestAnimationFrame(() => animate(cell, updatedCurrentPos));
        context.clearRect(0, 0, ref.current.width, ref.current.height);

        let isCurrentPlayerX = false; // является ли позиция фишки позицией карточки
        let isCurrentPlayerY = false;

        // фишка движется на 10 пикселей, поэтому нужно просчитать погрешность в +10 и -10
        for (let i = 0; i < 10; i++) {
            const playerCurrentX = player.current.x - Math.round(cell.width / 2);
            const playerCurrentY = player.current.y - Math.round(cell.height / 2);

            if (!isCurrentPlayerX) {
                const isValidY = playerCurrentX - i === cell.x
                || playerCurrentX + i === cell.x;
                if (isValidY) isCurrentPlayerX = true;
            }

            if (!isCurrentPlayerY) {
                const isValidY = playerCurrentY - i === cell.y
                || playerCurrentY + i === cell.y;
                if (isValidY) isCurrentPlayerY = true;
            }
        }

        // если текущие Х и У совпадают с координатами нужной карточки = остановка
        if (isCurrentPlayerX && isCurrentPlayerY) stop();

        player.current.move();
    };

    useEffect(() => {
        ref.current.setSize(width, height);
        player.current.init();
    }, [width, height]);

    useEffect(() => {
        if (squares) {
            const player = board.getPlayerById(1);

            if (player) {
                const sumSquares = squares.reduce((a, b) => a + b);
                const updatedCurrentPos = player.updateCurrentPos(sumSquares);
                const cell = board.getCellById(updatedCurrentPos);

                if (cell) {
                    console.log(updatedCurrentPos);
                    animate(cell, updatedCurrentPos);
                }
            }
        }
        return stop;
    }, [squares]);

    return ref.current;
};
