import { BoardCellType } from '../../../../core/types';
import { CardProps } from '../../Card/Card.types';
import BonusCard from '../BonusCard';
import { boxCases, IBoxCard, TBoxCardCase } from './BoxCard.types';

export default class BoxCard extends BonusCard implements IBoxCard {
    cases: TBoxCardCase[];

    private static instance: unknown;

    constructor(props: CardProps) {
        if (BoxCard.instance) {
            throw Error('use BoxCard.getInstance()');
        }
        super(props);
        this.cases = BonusCard.shuffleCases(boxCases);
    }

    public static getInstance(): BoxCard {
        if (!BoxCard.instance) {
            BoxCard.instance = new BoxCard({ type: BoardCellType.box, name: 'Казна' });
        }
        return BoxCard.instance as BoxCard;
    }

    getCase() {
        const boxCase = this.cases.shift() as TBoxCardCase;
        this.cases.push(boxCase);

        return boxCase;
    }
}
