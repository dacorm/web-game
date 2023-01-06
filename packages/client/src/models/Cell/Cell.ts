import { Shape, ShapeProps } from '../../core/Shapes/Shape';
import { Card } from '../Cards/Card/Card';
import board from '../Board/Board';
import { CellProps } from './Cell.types';

export class Cell extends Shape {
    readonly x: number;

    readonly y: number;

    public board: typeof board;

    public card: Card;

    public id: number;

    width: number;

    height: number;

    constructor(props: CellProps) {
        super(props as ShapeProps);
        this.x = Math.round(props.x);
        this.y = Math.round(props.y);
        this.width = Math.round(props.width);
        this.height = Math.round(props.height);
        this.card = props.card;
        this.id = props.id;
        this.board = props.board;
        this.board.cells.push(this);
    }

    drawShape(context: CanvasRenderingContext2D) {
        this.context = context;

        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        this.fillStrokeShape();

        context.closePath();
    }
}
