import { useEffect, useRef } from 'react';

import { Canvas } from './helpers/Canvas';
import { Player } from '../../models/Player/Player';
import { board } from '../../models/Board/Board';
import { ActiveCanvasProps, TAnimateFunc } from './types/activeCanvas.types';

console.log('BOARD2', board.getCurrentTurn());
// Активный канвас. На нем будет рисоваться вся графика при взаимодействии с пользователем
export const activeCanvas = ({
    width, height, squares, players,
}: ActiveCanvasProps) => {
    // todo: добавить объект в стор
    const ref = useRef<Canvas>(new Canvas({ width, height }));
    const frame = useRef<number>(0);

    // const cellIsMoving = getCellIsMoving();
    console.log('BOARD3', board.getCurrentTurn());
    const context = ref.current.getContext();
    const stop = () => cancelAnimationFrame(frame.current);

    const animate: TAnimateFunc = (cell, player) => {
        frame.current = requestAnimationFrame(() => animate(cell, player));
        context.clearRect(0, 0, ref.current.width, ref.current.height);

        // if (player.collisionDetection(cell)) {
        //     stop();
        // }

        player.move(cell);
        board.reDrawAllPlayers();
    };

    // инициализируем игорков, при изменении кол-ва игроков пересоздаем генератор ходов c исключением обанкротившихся игроков
    useEffect(() => {
        if (!board.players.length) {
            console.log('init players');
            players?.map(({ userId, displayName }) => (new Player({ canvas: ref.current, userId, displayName })));
        }
        if (board.players.length && players?.length !== board.players.length) {
            console.log('перерасчет игроков');
            board.players.filter((player) => players?.some(({ userId }) => player.userId === userId));
        }

        board.createGeneratorMoveSequnce();
    }, [players]);

    // при ресайзе доски переинициализируем фишки и саму доску
    // TODO: при иниализации фишки она тпшится на старт, надо просто перерисовывать ее на том же месте с частично обновленными координатми
    useEffect(() => {
        ref.current.setSize(width, height);
        board.initAllPlayers();
    }, [width, height]);

    useEffect(() => {
        // todo: этот код нужно перенести в обработчик кнопки кубиков, он здесь только потому что не было стора
        if (squares?.some((v) => v)) {
            console.log('board', board);
            console.log('board.currentTurn', board.currentTurn);
            const player = board.getPlayerById(board.currentTurn);
            console.log(`ходит игрок с id = ${player?.userId}, ${player?.displayName}`);

            if (player) {
                const sumSquares = squares.reduce((a, b) => a + b);
                const updatedCurrentPos = player.updateCurrentPos(sumSquares);
                console.log('updatedCurrentPos', updatedCurrentPos);
                player.addCell(board.getCell(updatedCurrentPos));

                // eslint-disable-next-line no-restricted-syntax
                for (const cell of player.generateCells()) {
                // todo: нужно дождаться завершения анимации и запустить следующую
                    if (cell) {
                        animate(cell, player);
                    }
                }
            }
        }
        return stop;
    }, [squares]);

    return ref.current;
};
