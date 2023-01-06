import { Card } from '../Cards/Card/Card';
import board from '../Board/Board';

export interface CellProps {
    x: number;
    y: number;
    board: typeof board;
    card: Card;
    id: number;
    width: number;
    height: number;
    fill: string
}

export interface ICell extends CellProps {
    drawShape(context: CanvasRenderingContext2D): void
}
