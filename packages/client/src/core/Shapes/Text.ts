import { Shape, ShapeProps } from './Shape';

export interface IText {
  x: number
  y: number
  width: number
  height: number
  text: string
}

type Props = IText & ShapeProps;

export class Text extends Shape implements IText {
    x: number;

    y: number;

    width: number;

    height: number;

    text: string;

    constructor(props: Props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.text = props.text;
    }

    // todo
    drawShape(context: CanvasRenderingContext2D) {
        this.context = context;
    }
}
