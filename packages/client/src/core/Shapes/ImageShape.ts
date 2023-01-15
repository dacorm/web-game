import { Shape, ShapeProps } from './Shape';

export interface IImageShape {
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  rotate?: number
  offsetX?: number
  offsetY?: number
}

type Props<I extends object = IImageShape> = Omit<I, 'image'> & ShapeProps & {
  image: string
}

export class ImageShape extends Shape implements IImageShape {
    image: HTMLImageElement;

    x;

    y;

    width;

    height;

    rotate: number;

    offsetX: number | undefined;

    offsetY: number | undefined;

    constructor(props: Props) {
        super(props);

        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.rotate = props.rotate || 0;
        this.offsetX = props.offsetX || 0.5;
        this.offsetY = props.offsetY || 0.5;

        const image = new Image();
        image.src = props.image;
        this.image = image;
    }

    drawShape(context: CanvasRenderingContext2D) {
        this.image.addEventListener('load', () => {
            const contain = this.contain();
            const {
                offsetX, offsetY, width, height,
            } = contain(this.width, this.height, this.image.width, this.image.height);

            context.save();

            try {
                if (this.rotate) {
                    context.translate(this.x + this.width / 2, this.y + this.height / 2);
                    // eslint-disable-next-line no-mixed-operators
                    context.rotate(this.rotate * Math.PI / 180);

                    context.drawImage(this.image, offsetX - this.width / 2, offsetY - this.height / 2, width, height);
                } else {
                    context.translate(this.x, this.y);
                    context.drawImage(this.image, offsetX, offsetY, width, height);
                }
            } catch (e) {
                console.log(e);
            }
            context.restore();
        }, false);
    }

    // eslint-disable-next-line class-methods-use-this
    private fit(contains: boolean) {
        return (parentWidth: number, parentHeight: number, childWidth: number, childHeight: number, scale = 1, offsetX = 0.5, offsetY = 0.5) => {
            const childRatio = childWidth / childHeight;
            const parentRatio = parentWidth / parentHeight;
            let width = parentWidth * scale;
            let height = parentHeight * scale;

            if (contains ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
                height = width / childRatio;
            } else {
                width = height * childRatio;
            }

            return {
                offsetX: Math.round((parentWidth - width) * offsetX),
                offsetY: Math.round((parentHeight - height) * offsetY),
                width: Math.round(width),
                height: Math.round(height),
            };
        };
    }

    contain() {
        return this.fit(true);
    }

    cover() {
        return this.fit(false);
    }
}
