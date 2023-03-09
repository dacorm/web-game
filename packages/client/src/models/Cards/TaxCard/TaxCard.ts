import { TaxCardProps } from './TaxCard.types';

import { addNewGameChatMessage } from '../../../redux/actionCreators/game';
import store from '../../../redux/store';
import { Player } from '../../Player/Player';
import { Card } from '../Card/Card';

class TaxCard extends Card {
    price: number;

    constructor(props: TaxCardProps) {
        super(props);
        this.price = 150;
    }

    payTax(player: Player) {
        const isPayment = player.payMoneyToTheBank(this.price);

        if (!isPayment) return;

        store.dispatch(
            addNewGameChatMessage({
                playerName: player.displayName,
                message: `Оплачивает налог в размере ${this.price} $`,
            }),
        );

        this.complete();
    }
}

export default TaxCard;
