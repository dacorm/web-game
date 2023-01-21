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

    fontSize:number;

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
        console.log('words', words);

        words.forEach((word, i) => {
            // this.context = context;
            // const fontSize = this.width / 6;
            const d = (this.width / 8) * i;
            console.log(`${this.fontSize}px serif`);
            context.font = `${this.fontSize}px serif`;
            console.log('text', this.text);
            console.log('text x: ', this.x, 'text y: ', this.y);
            console.log('width: ', this.width, 'height: ', this.height);

            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = 'black';
            context.save();
            if (this.rotate) {
                console.log('rotate', this.rotate);
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
