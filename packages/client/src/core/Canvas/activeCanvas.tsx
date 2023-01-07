import { useEffect, useRef } from 'react';
import { Canvas } from './helpers/Canvas';
import { Player } from '../../models/Player/Player';
import { board } from '../../models/Board/Board';
import { activeCanvasProps, TAnimateFunc } from './types/activeCanvas.types';

// Активный канвас. На нем будет рисоваться вся графика при взаимодействии с пользователем
export const activeCanvas = ({ width, height, squares }: activeCanvasProps) => {
    // todo: добавить объект в стор
    const ref = useRef<Canvas>(new Canvas({ width, height }));
    const frame = useRef<number>(0);
    const player = useRef<Player>(new Player({ canvas: ref.current, userId: 1 }));

    const context = ref.current.getContext();
    const stop = () => cancelAnimationFrame(frame.current);

    const animate: TAnimateFunc = (cell) => {
        frame.current = requestAnimationFrame(() => animate(cell));
        context.clearRect(0, 0, ref.current.width, ref.current.height);

        const player = board.getPlayerById(1);
        if (!player) {
            return stop();
        }

        // if (player.collisionDetection(cell)) {
        //     stop();
        // }

        player.move(cell);
    };

    useEffect(() => {
        ref.current.setSize(width, height);
        player.current.init();
    }, [width, height]);

    useEffect(() => {
        // todo: этот код нужно перенести в обработчик кнопки кубиков, он здесь только потому что не было стора
        if (squares?.some((v) => v)) {
            const player = board.getPlayerById(1);

            if (player) {
                const sumSquares = squares.reduce((a, b) => a + b);
                const updatedCurrentPos = player.updateCurrentPos(sumSquares);
                player.addCell(board.getCell(updatedCurrentPos));

                // eslint-disable-next-line no-restricted-syntax
                for (const cell of player.generateCells()) {
                // todo: нужно дождаться завершения анимации и запустить следующую
                    if (cell) {
                        animate(cell);
                    }
                }
            }
        }
        return stop;
    }, [squares]);

    return ref.current;
};
