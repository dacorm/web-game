import { Rect } from '../../core/Shapes/Rect';
import { ImageShape } from '../../core/Shapes/ImageShape';
import {
    BoardCellAxis, BoardCellGroup, BoardCellType, BoardItemSize,
} from '../../core/types';
import { FillRect } from '../../core/Shapes/FillRect';
import { Text } from '../../core/Shapes/Text';
import { TCard } from '../Cards/Card/Card.types';

interface ICell {
  name: string
  department: boolean
  context?: CanvasRenderingContext2D
  axis: BoardCellAxis
  type?: BoardCellType
  group?: BoardCellGroup
  shape?: Rect | ImageShape
  image?: string
  card?: TCard;
  readonly x?: number
  readonly y?: number
  readonly width?: number
  readonly height?: number
}

type Props = Omit<ICell, 'shape' | 'department'> & Partial<Pick<ICell, 'department'>>

export class Cell implements ICell {
    name;

    department = false;

    type;

    group;

    axis;

    shape: Rect | undefined;

    image: string | undefined;

    card: TCard;

    context: CanvasRenderingContext2D | undefined;

    constructor(props: Props) {
        this.name = props.name;
        this.department = props.department ?? false;
        this.type = props.type;
        this.group = props.group;
        this.axis = props.axis;
        this.image = props.image;
        this.card = props.card as TCard;
    }

    get x(): number | undefined {
        return this.shape?.x;
    }

    get y(): number | undefined {
        return this.shape?.y;
    }

    get width(): number | undefined {
        return this.shape?.width;
    }

    get height(): number | undefined {
        return this.shape?.height;
    }

    draw(props: BoardItemSize) {
        if (this.context) {
            const { rotate, ...otherProps } = props;

            if (this.image) {
                this.shape = new ImageShape({ image: this.image, ...props });
                new Rect(props).drawShape(this.context);
            } else {
                this.shape = new Rect(otherProps);
            }

            this.shape.drawShape(this.context);
            this.createTitle(otherProps);
            this.createColorHead();
        }
    }

    createTitle(props: BoardItemSize) {
        if (this.context) {
            new Text({ text: this.name, ...props }).drawShape(this.context);
        }
    }

    createColorHead() {
        if (this.context && this.group) {
            let props: BoardItemSize = {
                width: this.width || 0, height: this.height || 0, x: this.x || 0, y: this.y || 0,
            };

            switch (this.axis) {
            case BoardCellAxis.top:
                props = { ...props, height: props.height / 3, y: props.height - props.height / 3 };
                break;
            case BoardCellAxis.right:
                props = { ...props, width: props.width / 3 };
                break;
            case BoardCellAxis.bottom:
                props = { ...props, height: props.height / 3 };
                break;
            case BoardCellAxis.left:
                props = { ...props, width: props.width / 3, x: props.width - props.width / 3 };
                break;
            default:
            }

            new FillRect({ ...props, fill: this.group as unknown as string }).drawShape(this.context);
        }
    }
}
