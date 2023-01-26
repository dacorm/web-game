import { Canvas } from '../../core/Canvas/helpers/Canvas';
import { Circle } from '../../core/Shapes/Circle';
import { Util } from '../../core/Util';
import { board } from '../Board/Board';
import { PlayerProps } from './Player.types';
import store from '../../redux/store';
import { actionStart, stopCellMoving } from '../../redux/actionCreators/game';
import { Cell } from '../Cell/Cell';
import { BoardCellAxis } from '../../core/types';
import Property from '../Cards/Card/PropertyCard/PropertyCard';

export interface Player {
  x: number
  y: number
  currentPos: number
  cells: Cell[]
  radius: number
  fill: string
  canvas: Canvas
  trails: { x: number; y: number }[]
  trailCount: number
  userId: number
  displayName: string
  property: Property[]
  stations: any // пока нету класса жд дорог так что any
  balance: number
  init(): void
  draw(velocity: { x: number; y: number }, cell?: Cell): void
  move(cell?: Cell): void
  stopVelocity(
    velocity: { x: number; y: number },
    cell?: Cell,
  ): { x: number; y: number }
}
/* eslint-disable-next-line */
export class Player {
    // todo: канвас везде надо забирать из стора
    constructor({ canvas, userId, displayName }: PlayerProps) {
        this.canvas = canvas as Canvas;
        this.userId = userId;
        this.displayName = displayName;
        this.currentPos = 0; // текущая позиция фишки относительно id карточки
        this.cells = []; // todo: возможно стоит объединить с переменной выше
        this.property = []; // экземпляры классов приобретенного имущества
        this.stations = []; // экземпляры классов приобретенных жд дорог
        this.balance = 1500; // баланс у игроков(при старте выдается 1500)
        board.players.push(this);
    }

    init() {
        const { width, height } = Util.getCornerItemSize(this.canvas);
        this.x = Number((width / 2).toFixed());
        this.y = Number((height / 2).toFixed());
        this.radius = 50;
        this.fill = Util.randomColor();
        this.trails = [];
        this.trailCount = 10;

        this.draw();
    }

    addCell(cell?: Cell) {
        if (cell) {
            this.cells.push(cell);
        }
    }

    * generateCells() {
        while (this.cells.length) {
            yield this.cells.shift();
        }
    }

    // eslint-disable-next-line default-param-last
    draw(velocity = { x: 0, y: 0 }, cell?: Cell) {
        if (cell) {
            velocity = this.stopVelocity(velocity, cell);
        }
        // проверка закончила ли фишка передвижение
        const xIsNull = velocity.x === 0;
        const yIsNull = velocity.y === 0;
        if (xIsNull && yIsNull && store.getState().game.cellIsMoving) {
            console.log('cellIsMoving false');
            store.dispatch(stopCellMoving());
            store.dispatch(actionStart());
        }

        this.x += velocity.x;
        this.y += velocity.y;

        const circle = new Circle({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fill: this.fill,
        });
        circle.drawShape(this.canvas.getContext());
    }

    /** перерисовка компонента в той же позиции */
    reDraw() {
        const circle = new Circle({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fill: this.fill,
        });
        circle.drawShape(this.canvas.getContext());
    }

    stopVelocity(velocity: { x: 0; y: 0 }, { shape, axis, name }: Cell) {
        if (shape) {
            switch (axis) {
            case BoardCellAxis.top:
                if (name === 'Старт') {
                    return shape.y + shape.height / 2 >= this.y ? { x: 0, y: 0 } : velocity;
                }

                return shape.x + shape.width / 2 <= this.x ? { x: 0, y: 0 } : velocity;
            case BoardCellAxis.right:
                if (name === 'Тюрьма') {
                    return shape.x + shape.width / 2 <= this.x ? { x: 0, y: 0 } : velocity;
                }

                return shape.y + shape.height / 2 <= this.y ? { x: 0, y: 0 } : velocity;
            case BoardCellAxis.bottom:
                if (name === 'Бесплатная стоянка') {
                    return shape.y + Math.floor(shape.height / 2) <= this.y ? { x: 0, y: 0 } : velocity;
                }

                return shape.x + shape.width / 2 >= this.x ? { x: 0, y: 0 } : velocity;
            case BoardCellAxis.left:
                if (name === 'Тюрьма') {
                    return shape.x + shape.width / 2 >= this.x ? { x: 0, y: 0 } : velocity;
                }

                return shape.y + shape.height / 2 >= this.y ? { x: 0, y: 0 } : velocity;
            default:
                return velocity;
            }
        }

        return velocity;
    }

    move(cell: Cell) {
        this.trails.push({ x: this.x, y: this.y });
        if (this.trails.length > this.trailCount) {
            this.trails.shift();
        }

        const velocity = { x: 0, y: 0 };
        // параметры элемента который располагается по углам доски
        const cornerItem = Util.getCornerItemSize(this.canvas);
        const width = this.canvas.getWidth();
        const height = this.canvas.getHeight();

        // todo: условие жуткое, переписать!
        if (
            this.y <= cornerItem.height / 2
      && this.y >= 0
      && this.x <= width - cornerItem.width / 2
        ) {
            velocity.x = 10;
        } else if (
            this.x >= width - cornerItem.width
      && this.x <= width
      && this.y <= height - cornerItem.height / 2
        ) {
            velocity.y = 10;
        } else if (
            this.y >= height - cornerItem.height
      && this.y <= height
      && this.x >= cornerItem.width / 2
        ) {
            velocity.x = -10;
        } else if (
            this.x <= cornerItem.width
      && this.x >= 0
      && this.y >= cornerItem.height / 2
        ) {
            velocity.y = -10;
        }

        this.draw(velocity, cell);
        // this.drawTrails();

        return { x: this.x, y: this.y };
    }

    // анимация тени пройденного пути
    drawTrails() {
        const context = this.canvas.getContext();
        this.trails.push({ x: this.x, y: this.y });
        if (this.trails.length > this.trailCount) {
            this.trails.shift();
        }
        this.trails.forEach((position, i) => {
            const ratio = (i + 1) / this.trails.length;
            context.fillStyle = Util.hexToRGB(this.fill, ratio / 2);
            context.moveTo(position.x, position.y);
            context.beginPath();
            context.arc(position.x, position.y, this.radius, 0, 2 * Math.PI);
            context.fill();
        });
    }

    /** заплатить деньги другому игроку */
    payMoneyToThePlayer(value: number, owner: Player) {
        this.balance -= value;
        owner.balance += value;
    }

    /** заплатить деньги в банк  */
    payMoneyToTheBank(value: number) {
        this.balance -= value;
    }

    /** получить деньги от банка */
    getMoney(value: number) {
        this.balance += value;
    }

    /** обновить текущую позицию игрока на новую клетку в зависимости от кубика  */
    updateCurrentPos(value: number) {
        this.currentPos += value;

        if (this.currentPos > 39) {
            this.currentPos -= 40;
        }
        console.log(`переход к ячейке с индексом ${this.currentPos}`);

        return this.currentPos;
    }
}
