import { Shape, ShapeProps } from './Shape';

type Props = {
  x: number
  y: number
  radius: number
} & ShapeProps

export interface Circle {
  x: number
  y: number
  radius: number
}

/* eslint-disable-next-line */
export class Circle extends Shape {
    constructor(props: Props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.radius = props.radius;
    }

    drawShape(context: CanvasRenderingContext2D) {
        this.pathShape = new Path2D();
        this.pathShape.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context = context;

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.fillStrokeShape();

        context.closePath();
    }
}
