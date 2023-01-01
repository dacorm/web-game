import { Shape, ShapeProps } from './Shape';

type Props = {
  img: CanvasImageSource
  x: number
  y: number
  width: number
  height: number
  rotate: number
} & ShapeProps

export interface Image {
  img: CanvasImageSource
  x: number
  y: number
  width: number
  height: number
  rotate: number
}

export class Image extends Shape {
    constructor(props: Props) {
        super(props);

        this.img = props.img;
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.rotate = props.rotate;
    }

    drawShape(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotate);

        try {
            context.drawImage(this.img, 0, 0, this.width, this.height);
        } catch (e) {
            console.log(e);
        }

        context.restore();
    }
}
