// eslint-disable-next-line import/no-named-default
import { default as EventEmitter } from 'eventemitter3';
import { Rect } from '../../core/Shapes/Rect';
import { ImageShape } from '../../core/Shapes/ImageShape';
import {
    BoardCellAxis,
    BoardCellGroup,
    BoardCellType,
    BoardItemSize,
} from '../../core/types';
import { FillRect } from '../../core/Shapes/FillRect';
import { Text } from '../../core/Shapes/Text';
import { TCard } from '../Cards/Card/Card.types';
import PropertyCard from '../Cards/PropertyCard';
import housImg from '../../assets/img/house.png';

interface ICell {
  name: string
  department: boolean
  context?: CanvasRenderingContext2D
  axis: BoardCellAxis
  type?: BoardCellType
  group?: BoardCellGroup
  shape?: Rect | ImageShape
  image?: string
  card?: TCard
  readonly x?: number
  readonly y?: number
  readonly width?: number
  readonly height?: number
}

type Props = Omit<ICell, 'shape' | 'department'> &
  Partial<Pick<ICell, 'department'>>

export class Cell extends EventEmitter implements ICell {
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
        super();

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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { rotate, ...otherProps } = props;

            if (this.image) {
                this.shape = new ImageShape({ image: this.image, ...props });
                new Rect(props).drawShape(this.context);
            } else {
                this.shape = new Rect(otherProps);
            }

            this.shape.drawShape(this.context);
            this.createTitle(props);

            this.createColorHead();
            this.createColorOwner();
            this.createPrice(props);
        }
    }

    createPrice(props: BoardItemSize) {
        if (this.card) {
            if (this.context) {
                switch (this.axis) {
                case BoardCellAxis.top:
                    props = {
                        ...props,
                        x: props.x + props.width / 2,
                        y: props.y + (5 * props.height) / 6,
                        maxWidth: props.width - props.width * 0.02,
                        fontSize: props.width / 6,
                    };

                    break;
                case BoardCellAxis.right:
                    props = {
                        ...props,
                        x: props.x + props.width / 6,
                        y: props.y + props.height / 2,
                        maxWidth: props.height - props.height * 0.02,
                        fontSize: props.height / 6,
                    };

                    break;
                case BoardCellAxis.bottom:
                    props = {
                        ...props,
                        x: props.x + props.width / 2,
                        y: props.y + props.height / 6,
                        maxWidth: props.width - props.width * 0.02,
                        fontSize: props.width / 6,
                    };
                    break;
                case BoardCellAxis.left:
                    props = {
                        ...props,
                        x: props.x + (5 * props.width) / 6,
                        y: props.y + props.height / 2,
                        maxWidth: props.height - props.height * 0.02,
                        fontSize: props.height / 6,
                    };
                    break;
                default:
                }
                // todo: типизация

                if ((this.card as PropertyCard).prices) {
                    // @ts-ignore
                    new Text({
                        // @ts-ignore
                        text: (this.card.prices.buyCard as number).toString(),
                        ...props,
                    }).drawShape(this.context);
                }
            }
        }
    }

    createTitle(props: BoardItemSize) {
        const departmentProps = {
            ...props,
            x: props.x + props.width / 2,
            y: props.y + props.height / 10,
            maxWidth: props.width - props.width * 0.02,
            fontSize: props.width / 7,
        };

        if (this.context) {
            switch (this.axis) {
            case BoardCellAxis.top:
                if (this.department) {
                    props = departmentProps;
                } else {
                    props = {
                        ...props,
                        x: props.x + props.width / 2,
                        y: props.y + props.height / 15,
                        maxWidth: props.width - props.width * 0.02,
                        fontSize: props.width / 6,
                    };
                }

                break;
            case BoardCellAxis.right:
                if (this.department) {
                    props = departmentProps;
                } else {
                    props = {
                        ...props,
                        x: props.x + (14 * props.width) / 15,
                        y: props.y + props.height / 2,
                        maxWidth: props.height - props.height * 0.02,
                        fontSize: props.height / 6,
                    };
                }

                break;
            case BoardCellAxis.bottom:
                if (this.department) {
                    props = departmentProps;
                } else {
                    props = {
                        ...props,
                        x: props.x + props.width / 2,
                        y: props.y + (14 * props.height) / 15,
                        maxWidth: props.width - props.width * 0.02,
                        fontSize: props.width / 6,
                    };
                }

                break;
            case BoardCellAxis.left:
                if (this.department) {
                    props = departmentProps;
                } else {
                    props = {
                        ...props,
                        x: props.x + props.width / 15,
                        y: props.y + props.height / 2,
                        maxWidth: props.height - props.height * 0.02,
                        fontSize: props.height / 6,
                    };
                }

                break;
            default:
            }
            // todo: типизация
            // @ts-ignore
            new Text({ text: this.name, ...props }).drawShape(this.context);
        }
    }

    createHouse(countHouse: number) {
        let props: BoardItemSize = {
            width: this.width || 0,
            height: this.height || 0,
            x: this.x || 0,
            y: this.y || 0,
        };

        if (this.context) {
            switch (this.axis) {
            case BoardCellAxis.top:
                props = {
                    ...props,
                    x: props.x + props.width / 2,
                    y: props.y + props.height / 3,
                    maxWidth: props.width - props.width * 0.02,
                    fontSize: 36,
                };
                new FillRect({
                    ...props,
                    x: props.x - props.width / 6,
                    y: props.y - props.height / 9,
                    height: props.height / 2.5,
                    width: props.width / 3,
                    fill: 'white',
                }).drawShape(this.context);

                break;
            case BoardCellAxis.right:
                props = {
                    ...props,
                    x: props.x + props.width / 1.5,
                    y: props.y + props.height / 2,
                    maxWidth: props.height - props.height * 0.02,
                    fontSize: 36,
                    rotate: 90,
                };
                new FillRect({
                    ...props,
                    x: props.x - props.width / 3.5,
                    y: props.y - props.height / 6,
                    height: props.height / 2.5,
                    width: props.width / 2.5,
                    fill: 'white',
                }).drawShape(this.context);

                break;
            case BoardCellAxis.bottom:
                props = {
                    ...props,
                    x: props.x + props.width / 2,
                    y: props.y + props.height / 1.5,
                    maxWidth: props.width - props.width * 0.02,
                    fontSize: 36,
                    rotate: 180,
                };
                new FillRect({
                    ...props,
                    x: props.x - props.width / 6,
                    y: props.y - props.height / 9,
                    height: props.height / 2.5,
                    width: props.width / 3,
                    fill: 'white',
                }).drawShape(this.context);

                break;
            case BoardCellAxis.left:
                props = {
                    ...props,
                    x: props.x + props.width / 3,
                    y: props.y + props.height / 2,
                    maxWidth: props.height - props.height * 0.02,
                    fontSize: 36,
                    rotate: 270,
                };
                new FillRect({
                    ...props,
                    x: props.x - props.width / 9,
                    y: props.y - props.height / 6,
                    height: props.height / 2.5,
                    width: props.width / 2.5,
                    fill: 'white',
                }).drawShape(this.context);

                break;
            default:
            }
            // todo: типизация

            // @ts-ignore

            new Text({ text: `🏠 -- х${countHouse}`, ...props }).drawShape(
                this.context,
            );
        }
    }

    createColorHead() {
        if (this.context && (this.group || this.type === BoardCellType.station)) {
            let props: BoardItemSize = {
                width: this.width || 0,
                height: this.height || 0,
                x: this.x || 0,
                y: this.y || 0,
            };

            switch (this.axis) {
            case BoardCellAxis.top:
                props = {
                    ...props,
                    height: props.height / 3,
                    y: props.height - props.height / 3,
                };
                break;
            case BoardCellAxis.right:
                props = { ...props, width: props.width / 3 };
                break;
            case BoardCellAxis.bottom:
                props = { ...props, height: props.height / 3 };
                break;
            case BoardCellAxis.left:
                props = {
                    ...props,
                    width: props.width / 3,
                    x: props.width - props.width / 3,
                };
                break;
            default:
            }

            new FillRect({
                ...props,
                fill: this.group || ('grey' as unknown as string),
            }).drawShape(this.context);
        }
    }

    createColorOwner(color = 'rgba(0, 0, 0, 0)') {
        if (this.context && (this.group || this.type === BoardCellType.station)) {
            let props: BoardItemSize = {
                width: this.width || 0,
                height: this.height || 0,
                x: this.x || 0,
                y: this.y || 0,
            };

            switch (this.axis) {
            case BoardCellAxis.top:
                props = {
                    ...props,
                    height: props.height / 1.5,
                    y: props.height - props.height / 1,
                };
                break;
            case BoardCellAxis.right:
                props = {
                    ...props,
                    width: props.width / 1.5,
                    x: props.x + props.width / 3,
                };
                break;
            case BoardCellAxis.bottom:
                props = {
                    ...props,
                    height: props.height / 1.5,
                    y: props.y + props.height / 3,
                };
                break;
            case BoardCellAxis.left:
                props = {
                    ...props,
                    width: props.width / 1.5,
                };
                break;
            default:
            }

            new FillRect({ ...props, fill: color, globalAlpha: 0.5 }).drawShape(
                this.context,
            );
        }
    }
}
