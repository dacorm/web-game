import { TPricesProperty } from '../../../core/BoardStage/helpers/boardStageData';
import { Player } from '../../Player/Player';
import { Card } from '../Card/Card';
import { IPropertyCard, PropertyCardProps } from './PropertyCard.types';
import { StateCard } from '../Card/Card.types';
import { calculatePropertyRent } from '../helpers/calculatePropertyRent';
import { BoardCellGroup } from '../../../core/types';
import store from '../../../redux/store';
import { addNewGameChatMessage } from '../../../redux/actionCreators/game';

class PropertyCard extends Card implements IPropertyCard {
    prices: TPricesProperty;

    owner: null | Player;

    stateCard: StateCard;

    houses: number | null;

    group: BoardCellGroup;

    constructor(props: PropertyCardProps) {
        super(props);
        this.prices = props.prices;
        this.stateCard = StateCard.FREE;
        this.owner = null;
        this.houses = null;
        this.group = props.group;
    }

    /** Купить недвижимость */
    buy(player: Player) {
        if (player.balance >= this.prices.buyCard) { // достаточный ли баланс у игрока для покупки
            this.owner = player;
            player.property.push(this);
            player.payMoneyToTheBank(this.prices.buyCard);
            this.stateCard = StateCard.BOUGHT;

            store.dispatch(addNewGameChatMessage(
                {
                    playerName: player.displayName,
                    message: `приобретает ${this.name} за ${this.prices.buyCard} $`,
                },
            ));

            this.complete();
        } else {
            console.log('недостаточно денег');
        }
    }

    /** Воздержаться от покупки недвижимости */
    refuseToBuy() {
        store.dispatch(addNewGameChatMessage(
            {
                playerName: store.getState().game.currentPlayer.displayName,
                message: 'решает воздержаться от покуки недвижимости',
            },
        ));

        this.complete();
    }

    /** Заложить недвижимость */
    sell() {
        this.stateCard = StateCard.MORTAGED;

        store.dispatch(addNewGameChatMessage(
            {
                playerName: (this.owner as Player).displayName,
                message: `закладывает ${this.name} за ${this.prices.sellCard} $`,
            },
        ));

        this.complete();
    }

    /** Заплатить ренту владельку недвиги */
    rentPayment(player: Player) {
        if (this.owner) {
            const currentRent = calculatePropertyRent(this) as number;
            player.payMoneyToThePlayer(currentRent, this.owner);

            store.dispatch(addNewGameChatMessage(
                {
                    playerName: player.displayName,
                    message: `выплачивает ренту игроку ${player.displayName} в размере ${currentRent} $`,
                },
            ));
        }
        this.complete();
    }
}

export default PropertyCard;
