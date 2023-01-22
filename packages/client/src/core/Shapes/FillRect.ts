import { Shape, ShapeProps } from './Shape';

export interface IFillRect {
  x: number
  y: number
  width: number
  height: number
}

type Props = IFillRect & ShapeProps

export class FillRect extends Shape implements IFillRect {
    x: number;

    y: number;

    width: number;

    height: number;

    constructor(props: Props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
    }

    drawShape(context: CanvasRenderingContext2D) {
        this.context = context;

        context.beginPath();
        context.fillStyle = this.fill;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.closePath();
    }
}
