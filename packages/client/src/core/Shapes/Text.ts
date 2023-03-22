import { Shape, ShapeProps } from './Shape';

export interface IText {
  x: number
  y: number
  width: number
  height: number
  text: string
  rotate: number
  maxWidth: number
  fontSize:number
}

type Props = IText & ShapeProps;

export class Text extends Shape implements IText {
    x: number;

    y: number;

    width: number;

    height: number;

    text: string;

    rotate: number;

    maxWidth: number;

    fontSize: number;

    constructor(props: Props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.text = props.text;
        this.rotate = props.rotate;
        this.maxWidth = props.maxWidth;
        this.fontSize = props.fontSize;
    }

    // todo
    drawShape(context: CanvasRenderingContext2D) {
        const words = this.text.split(' ');

        words.forEach((word, i) => {
            // межстрочный отступ
            let d = 0;
            if (this.width > this.height) {
                d = (this.width / 10) * i;
            }
            if (this.height > this.width) {
                d = (this.height / 10) * i;
            }
            context.font = `${this.fontSize}px serif`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = 'black';

            context.save();
            if (this.rotate) {
                const gradus = (this.rotate * Math.PI) / 180;
                context.translate(this.x, this.y);
                context.rotate(gradus);
                context.fillText(word, 0, d, this.maxWidth);
            } else {
                context.fillText(word, this.x, this.y + d, this.maxWidth);
            }
            context.restore();
        });
    }
}
