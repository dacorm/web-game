import { board } from '../../../models/Board/Board';

/** получить ячекйку на которой стоит/перешел игрок */
const getCellFromBoard = () => {
    const player = board.getPlayerById(board.currentTurn);
    const currentPosition = player?.currentPos;
    const cell = board.getCell(currentPosition as number);

    return cell;
};

export { getCellFromBoard };
