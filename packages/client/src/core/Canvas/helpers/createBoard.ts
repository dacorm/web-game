import { Canvas } from './Canvas';
import { boardSize, Util } from '../../Util';
import { Cell } from '../../../models/Cell/Cell';
import board from '../../../models/Board/Board';
import { Card } from '../../../models/Cards/Card/Card';
import horizontCardsJson from '../../../models/Cards/Card/horizontCards.json';
import verticalCardsJson from '../../../models/Cards/Card/VerticalCards.json';

const colors = new Array(100).fill(0).map(Util.randomColor);

export function createBoard(canvas: Canvas) {
    const context = canvas.getContext();
    const size = Util.getCornerItemSize(canvas);

    // Делаем сетку, просто для примера
    for (let i = 0; i < 2; i++) {
        const top = i % 2 === 1;

        for (let j = boardSize; j--;) {
            const card = new Card({
                name: 'check card',
                id: horizontCardsJson[i][j].id,
            });
            new Cell({
                ...Util.getHorizontalItemSize(canvas),
                x: size.width + ((canvas.width - size.width * 2) / boardSize) * j,
                y: top ? 0 : canvas.height - size.height,
                fill: colors[j],
                card,
                board,
                id: card.id,
            }).drawShape(context);
        }
    }
    for (let i = 0; i < 2; i++) {
        const left = i % 2 === 1;

        for (let j = boardSize; j--;) {
            const card = new Card({
                name: 'check card',
                id: verticalCardsJson[i][j].id,
            });
            new Cell({
                ...Util.getVerticalItemSize(canvas),
                x: left ? 0 : canvas.width - size.width,
                y: size.height + ((canvas.height - size.height * 2) / boardSize) * j,
                fill: colors[j],
                card,
                board,
                id: card.id,
            }).drawShape(context);
        }
    }
}
