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
/* eslint-disable-next-line */
export class Rect extends Shape {
    constructor(props: Props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
    }

    drawShape(context: CanvasRenderingContext2D) {
        this.pathShape = new Path2D();

        this.pathShape.rect(this.x, this.y, this.width, this.height);

        this.context = context;

        // или можно так нарисовать, вместо 4 строк ниже
        // this.context.stroke(this.pathShape);

        context.beginPath();

        context.rect(this.x, this.y, this.width, this.height);

        this.fillStrokeShape();

        context.closePath();
    }
}
