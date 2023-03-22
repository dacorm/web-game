import { Shape, ShapeProps } from './Shape';

export interface IFillRect {
  x: number
  y: number
  width: number
  height: number
  globalAlpha?: number
}

type Props = IFillRect & ShapeProps

export class FillRect extends Shape implements IFillRect {
    x: number;

    y: number;

    width: number;

    height: number;

    globalAlpha: number;

    constructor(props: Props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.globalAlpha = props.globalAlpha ?? 1;
    }

    drawShape(context: CanvasRenderingContext2D) {
        this.pathShape = new Path2D();
        this.pathShape.rect(this.x, this.y, this.width, this.height);

        this.context = context;

        context.beginPath();
        context.fillStyle = this.fill;
        context.globalAlpha = this.globalAlpha;

        context.fillRect(this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;

        context.closePath();
    }
}
