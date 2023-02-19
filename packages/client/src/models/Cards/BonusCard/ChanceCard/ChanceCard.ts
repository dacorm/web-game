import { TChanceCardCase, IChanceCard, chanceCases } from './ChanceCard.types';
import { BoardCellType } from '../../../../core/types';
import { CardProps } from '../../Card/Card.types';
import BonusCard from '../BonusCard';

export default class ChanceCard extends BonusCard implements IChanceCard {
    cases: TChanceCardCase[];

    private static instance: unknown;

    constructor(props: CardProps) {
        if (ChanceCard.instance) {
            throw Error('use ChanceCard.getInstance()');
        }
        super(props);
        this.cases = BonusCard.shuffleCases(chanceCases);
    }

    public static getInstance(): ChanceCard {
        if (!ChanceCard.instance) {
            ChanceCard.instance = new ChanceCard({ type: BoardCellType.box, name: 'Шанс' });
        }
        return ChanceCard.instance as ChanceCard;
    }

    getCase() {
        const boxCase = this.cases.shift() as TChanceCardCase;
        this.cases.push(boxCase);

        return boxCase;
    }
}
