import {
    addNewGameChatMessage, actionStop, actionStart, stopCellMoving, setAllPlayers,
} from '../../redux/actionCreators/game';

import { Canvas } from '../../core/Canvas/helpers/Canvas';
import { Circle } from '../../core/Shapes/Circle';
import { Util } from '../../core/Util';
import { board } from '../Board/Board';
import { PlayerProps } from './Player.types';
import store from '../../redux/store';

import { Cell } from '../Cell/Cell';
import { BoardCellAxis } from '../../core/types';
import Property from '../Cards/PropertyCard/PropertyCard';
import StationCard from '../Cards/StationCard';

export interface Player {
  x: number
  y: number
  currentPos: number
  cells: Cell[]
  radius: number
  avatar: string
  fill: string
  canvas: Canvas
  trails: { x: number; y: number }[]
  trailCount: number
  userId: number
  displayName: string
  property: Property[]
  canBuyHouse: boolean;
  stations: StationCard[] // пока нету класса жд дорог так что any
  balance: number
  prisoner: boolean
  countMoves: number
  init(): void
  draw(velocity: { x: number; y: number }, cell?: Cell): void
  move(cell?: Cell): void
  stopVelocity(
    velocity: { x: number; y: number },
    cell?: Cell
  ): { x: number; y: number }
}
/* eslint-disable-next-line */
export class Player {
    // todo: канвас везде надо забирать из стора
    constructor({
        canvas, userId, displayName, avatar,
    }: PlayerProps) {
        this.canvas = canvas as Canvas;
        this.userId = userId;
        this.avatar = avatar;
        this.displayName = displayName;
        this.currentPos = 0; // текущая позиция фишки относительно id карточки
        this.cells = []; // todo: возможно стоит объединить с переменной выше
        this.property = []; // экземпляры классов приобретенного имущества
        this.stations = []; // экземпляры классов приобретенных жд дорог
        this.balance = 1500; // баланс у игроков(при старте выдается 1500)
        this.prisoner = false;
        this.countMoves = 0;
        this.canBuyHouse = true;
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
            store.dispatch(stopCellMoving());
            store.dispatch(actionStart());
        }

        if (!store.getState().game.cellIsMoving) {
            return;
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
                    return shape.y + shape.height / 2 >= this.y
                        ? { x: 0, y: 0 }
                        : velocity;
                }

                return shape.x + shape.width / 2 <= this.x ? { x: 0, y: 0 } : velocity;
            case BoardCellAxis.right:
                if (name === 'Вас поймали') {
                    return shape.x + shape.width / 2 <= this.x
                        ? { x: 0, y: 0 }
                        : velocity;
                }

                return shape.y + shape.height / 2 <= this.y
                    ? { x: 0, y: 0 }
                    : velocity;
            case BoardCellAxis.bottom:
                if (name === 'Бесплатная стоянка') {
                    return shape.y + Math.floor(shape.height / 2) <= this.y
                        ? { x: 0, y: 0 }
                        : velocity;
                }

                return shape.x + shape.width / 2 >= this.x ? { x: 0, y: 0 } : velocity;
            case BoardCellAxis.left:
                if (name === 'Тюрьма') {
                    return shape.x + shape.width / 2 >= this.x
                        ? { x: 0, y: 0 }
                        : velocity;
                }

                return shape.y + shape.height / 2 >= this.y
                    ? { x: 0, y: 0 }
                    : velocity;
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

    checkingBalance(value: number) {
        if (this.balance >= value) return true;
        return false;
    }

    eventNotEnoughMoney() {
        console.log(`недостаточно денег у игрока ${this.displayName}`);
        return false;
    }

    /** заплатить деньги другому игроку */
    payMoneyToThePlayer(value: number, owner: Player) {
        if (!this.checkingBalance(value)) {
            return this.eventNotEnoughMoney();
        }

        this.balance -= value;
        owner.balance += value;
        this.updateStorePlayers();

        return true;
    }

    /** обновить в сторе состояние игроков(для юзердаты) */
    updateStorePlayers() {
        store.dispatch(setAllPlayers());
    }

    /** заплатить деньги в банк  */
    payMoneyToTheBank(value: number) {
        if (!this.checkingBalance(value)) {
            return this.eventNotEnoughMoney();
        }
        this.balance -= value;
        this.updateStorePlayers();

        return true;
    }

    /** получить деньги от банка */
    getMoney(value: number) {
        this.balance += value;
        this.updateStorePlayers();
    }

    /** получить деньги за прохождение старта */
    getMoneyForStart() {
        this.getMoney(200);
        this.updateStorePlayers();
    }

    /** поменять координаты фишки игрока */
    changePosition(cellIndex: number) {
        const cell = board.getCell(cellIndex) as Cell;
        this.x = (cell.x as number) + (cell?.width as number) / 2;
        this.y = (cell.y as number) + (cell?.height as number) / 2;
    }

    /** отправить игрока на клетку без выплаты денег за старт */
    sendPlayerToCellWithoutStart(cellIndex: number) {
        this.changePosition(cellIndex);

        this.currentPos = cellIndex;

        store.dispatch(actionStop());
        setTimeout(() => {
            store.dispatch(actionStart());
        }, 0);
    }

    /** отправить игрока на клетку без выплаты денег за старт и без экшена */
    sendPlayerToCellWithoutStartAndAction(cellIndex: number) {
        this.changePosition(cellIndex);

        this.currentPos = cellIndex;

        store.dispatch(actionStop());
    }

    /** отправить игрока на клетку с возможностью выплаты денег за старт */
    sendPlayerToCellWithStart(cellIndex: number) {
        const index = this.currentPos > cellIndex // вычисляем на сколько нужно передвинуться игроку относительно своей позиции
            ? (board.stage?.cells.length as number) - this.currentPos + cellIndex
            : cellIndex - this.currentPos;

        this.updateCurrentPos(index);

        this.changePosition(cellIndex);

        store.dispatch(actionStop());
        setTimeout(() => {
            store.dispatch(actionStart());
        }, 0);
    }

    setCanBuyHouse(val: boolean) {
        this.canBuyHouse = val;
    }

    /** обновить текущую позицию игрока на новую клетку в зависимости от кубика  */
    updateCurrentPos(value: number) {
        this.currentPos += value;

        if (this.currentPos > 39) {
            this.currentPos -= 40;
            this.getMoneyForStart();
            store.dispatch(
                addNewGameChatMessage({
                    message: 'получает 200$ за прохождения поля "Старт"',
                    playerName: this.displayName,
                }),
            );
        }

        return this.currentPos;
    }
}
