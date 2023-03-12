import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Canvas } from './helpers/Canvas';
import { Player } from '../../models/Player/Player';
import { board } from '../../models/Board/Board';
import { ActiveCanvasProps, TAnimateFunc } from './types/activeCanvas.types';
import { addNewGameChatMessage } from '../../redux/actionCreators/game';

// Активный канвас. На нем будет рисоваться вся графика при взаимодействии с пользователем
export const activeCanvas = ({
    width, height, squares, players,
}: ActiveCanvasProps) => {
    // todo: добавить объект в стор
    const ref = useRef<Canvas>(new Canvas({ width, height }));
    const frame = useRef<number>(0);
    const dispatch = useDispatch<Dispatch>();

    const context = ref.current.getContext();
    const stop = () => cancelAnimationFrame(frame.current);

    const animate: TAnimateFunc = (cell, player) => {
        frame.current = requestAnimationFrame(() => animate(cell, player));
        context.clearRect(0, 0, ref.current.width, ref.current.height);
        player.move(cell);
        board.reDrawAllPlayers();
    };

    // инициализируем игорков, при изменении кол-ва игроков пересоздаем генератор ходов c исключением обанкротившихся игроков
    useEffect(() => {
        if (!board.players.length) {
            players?.map(
                ({ userId, displayName, avatar }) => new Player({
                    canvas: ref.current, userId, displayName, avatar,
                }),
            );
        }
        if (board.players.length && players?.length !== board.players.length) {
            board.players.filter((player) => players?.some(({ userId }) => player.userId === userId));
        }

        board.createGeneratorMoveSequnce();
        board.initAllPlayers();
    }, [players]);

    // при ресайзе доски переинициализируем фишки и саму доску
    // TODO: при иниализации фишки она тпшится на старт, надо просто перерисовывать ее на том же месте с частично обновленными координатми
    useEffect(() => {
        ref.current.setSize(width, height);
        board.initAllPlayers();
    }, [width, height]);

    useEffect(() => {
        const player = board.getPlayerById(board.currentTurn);
        if (!player) return;
        if (player?.prisoner) return;
        // todo: этот код нужно перенести в обработчик кнопки кубиков, он здесь только потому что не было стора
        if (squares?.some((v) => v)) {
            const sumSquares = squares.reduce((a, b) => a + b);
            dispatch(addNewGameChatMessage(
                {
                    playerName: player.displayName,
                    message: `бросает кубики и выбивает число ${sumSquares}`,
                },
            ));
            const updatedCurrentPos = player.updateCurrentPos(sumSquares);
            player.addCell(board.getCell(updatedCurrentPos));

            // eslint-disable-next-line no-restricted-syntax
            for (const cell of player.generateCells()) {
                // todo: нужно дождаться завершения анимации и запустить следующую
                if (cell) {
                    animate(cell, player);
                }
            }
        }
        return stop;
    }, [squares]);

    return ref.current;
};
