import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Canvas } from './helpers/Canvas';
import { Player } from '../../models/Player/Player';
import { board } from '../../models/Board/Board';
import { ActiveCanvasProps, TAnimateFunc } from './types/activeCanvas.types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { addNewGameChatMessage } from '../../redux/actionCreators/game';
// Активный канвас. На нем будет рисоваться вся графика при взаимодействии с пользователем
export const activeCanvas = ({
    width, height, squares, players,
}: ActiveCanvasProps) => {
    // todo: добавить объект в стор
    const ref = useRef<Canvas>(new Canvas({ width, height }));
    const frame = useRef<number>(0);
    const stopCellMoving = useTypedSelector((state) => state.game.cellIsMoving);
    const dispatch = useDispatch<Dispatch>();

    // const cellIsMoving = getCellIsMoving();
    const currentPlayer = useTypedSelector((state) => state.game.currentPlayer);
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

    useEffect(() => {
        stop();
    }, [stopCellMoving]);

    // инициализируем игорков, при изменении кол-ва игроков пересоздаем генератор ходов c исключением обанкротившихся игроков
    useEffect(() => {
        if (!board.players.length) {
            console.log('init players');
            players?.map((player) => (new Player({
                canvas: ref.current, userId: player.userId, displayName: player.displayName, color: player.color, currentPos: player.currentPos ? player.currentPos : 0,
            })));
        }

        if (board.players.length && players?.length !== board.players.length) {
            console.log('перерасчет игроков');
            board.players.filter((player) => players?.some(({ userId }) => player.userId === userId));
        }

        board.createGeneratorMoveSequnce();

        // TODO: при наличии currentPlayer в store (в стор он попадет из кеша localStorage), необходимо после создания генератора переключить ход на того игрока который содержиться в current
        if (currentPlayer.userId !== null) {
            if (board.currentTurn === null) {
                console.log('перерасчет ходов после перезагрузке страницы');
                while (currentPlayer.userId !== board.currentTurn) {
                    board.setNextTurn();
                }
            }
        }
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
            const player = board.getPlayerById(board.currentTurn);
            console.log(`ходит игрок с id = ${player?.userId}, ${player?.displayName}`);

            if (player) {
                // получаем сумму значений выпавших на кубиках
                const sumSquares = squares.reduce((a, b) => a + b);
                dispatch(addNewGameChatMessage(
                    {
                        playerName: player.displayName,
                        message: `бросает кубики и выбивает число ${sumSquares}`,
                    },
                ));
                // получаем id ячейки на которую необходимо передвинуться
                const updatedCurrentPos = player.updateCurrentPos(sumSquares);
                // получаем ячейку по ее id и добавляем эту ячейку в массив у игрока
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
        // return stop;
    }, [squares]);

    return ref.current;
};
