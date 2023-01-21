import { Canvas } from '../../Canvas/helpers/Canvas';
import { boardCount, Util } from '../../Util';
import { board } from '../../../models/Board/Board';
import { BoardCellAxis, BoardItemSize } from '../../types';
import { boardStageData } from './boardStageData';
import { ImageShape } from '../../Shapes/ImageShape';
import background from '../../../assets/img/sprites/background.png';

const lineItemCount = boardCount + 1;

export function createBoard(canvas: Canvas, stage: ReturnType<typeof boardStageData>) {
    const context = canvas.getContext();
    const size = Util.getCornerItemSize(canvas);
    const horizontalSize = Util.getHorizontalItemSize(canvas);
    const verticalSize = Util.getVerticalItemSize(canvas);

    if (size.width !== 0) {
        console.log('size', size);
        console.log('horizontalSize', horizontalSize);
        console.log('verticalSize', verticalSize);
        console.log('stage', stage);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    stage.cells.forEach((cell, index) => {
        if (size.width !== 0) {
            console.log(cell);
        }
        cell.context = context;
        const isDepartment = cell.department;
        const horizontalX = horizontalSize.width * (index % lineItemCount) - horizontalSize.width + size.width;
        const verticalY = verticalSize.height * (index % lineItemCount) - verticalSize.height + size.height + 1;

        let props: BoardItemSize;
        switch (cell.axis) {
        case BoardCellAxis.top:
            props = isDepartment ? { ...size, x: 0, y: 0 } : { ...horizontalSize, x: horizontalX, y: 0 };

            if (size.width !== 0) {
                console.log('top props', props);
            }
            break;
        case BoardCellAxis.right:
            props = isDepartment ? { ...size, y: 0 } : {
                ...verticalSize, x: canvas.width - size.width, y: verticalY, rotate: 90,
            };
            break;
        case BoardCellAxis.bottom:
            props = isDepartment ? { ...size } : {
                ...horizontalSize, x: horizontalX, y: canvas.height - size.height, rotate: 180,
            };
            break;
        case BoardCellAxis.left:
            props = isDepartment ? { ...size, x: 0 } : {
                ...verticalSize, x: 0, y: verticalY, rotate: 270,
            };
            break;
        default:
            props = { ...size };
        }

        if (size.width !== 0) {
            console.log(cell);
        }
        cell.draw(props);
    });

    new ImageShape({
        x: size.width,
        y: size.height,
        width: Math.round((canvas.width - size.width * 2)),
        height: Math.round((canvas.height - size.height * 2)),
        image: background,
    }).drawShape(context);

    board.stage = stage;
}
