import { Shape, ShapeProps } from './Shape';

type Props = {
  x: number
  y: number
  width: number
  height: number
} & ShapeProps

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export class Rect extends Shape {
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
        context.rect(this.x, this.y, this.width, this.height);
        this.fillStrokeShape();

        context.closePath();
    }
}
