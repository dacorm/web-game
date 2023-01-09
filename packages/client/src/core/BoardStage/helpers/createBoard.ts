import { Canvas } from '../../Canvas/helpers/Canvas';
import { boardSize, Util } from '../../Util';
import { board } from '../../../models/Board/Board';
import { BoardCellAxis, boardStageData } from './boardStageData';
import { Rect } from '../../Shapes/Rect';

const lineItemCount = boardSize + 1;

export function createBoard(canvas: Canvas, stage: ReturnType<typeof boardStageData>) {
    const context = canvas.getContext();
    const size = Util.getCornerItemSize(canvas);
    const horizontalSize = Util.getHorizontalItemSize(canvas);
    const verticalSize = Util.getVerticalItemSize(canvas);

    const shape: Rect[] = [];
    stage.cells.forEach((cell, index) => {
        const isDepartment = !(index % lineItemCount);
        const horizontalX = size.width / 2 + ((canvas.width - size.width * 2) / boardSize) * (index % lineItemCount);
        const verticalY = size.height / 2 + ((canvas.height - size.height * 2) / boardSize) * (index % lineItemCount);

        switch (cell.axis) {
        case BoardCellAxis.top:
            shape.push(isDepartment
                ? new Rect({ ...size, x: 0, y: 0 })
                : new Rect({ ...horizontalSize, x: horizontalX, y: 0 }));
            break;
        case BoardCellAxis.right:
            shape.push(isDepartment
                ? new Rect({ ...size, y: 0 })
                : new Rect({ ...verticalSize, x: canvas.width - size.width, y: verticalY }));
            break;
        case BoardCellAxis.bottom:
            shape.push(isDepartment
                ? new Rect({ ...size })
                : new Rect({ ...horizontalSize, x: horizontalX, y: canvas.height - size.height }));
            break;
        case BoardCellAxis.left:
            shape.push(isDepartment
                ? new Rect({ ...size, x: 0 })
                : new Rect({ ...verticalSize, x: 0, y: verticalY }));
            break;
        default:
        }

        cell.shape = shape.shift();
    });

    context.clearRect(0, 0, canvas.width, canvas.height);
    stage.cells.forEach((cell) => {
        cell.shape?.drawShape(context);
    });

    board.stage = stage;
}
