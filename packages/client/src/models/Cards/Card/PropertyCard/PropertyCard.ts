import { TPricesProperty } from '../../../../core/BoardStage/helpers/boardStageData';
import { Player } from '../../../Player/Player';
import { calculateRent } from '../../helpers/calculateRent';
import { Card } from '../Card';
import { IProperty, PropertyProps, StatePropertyCard } from './PropertyCard.types';

class Property extends Card implements IProperty {
    prices: TPricesProperty;

    owner: null | Player;

    stateCard: StatePropertyCard;

    houses: number | null;

    constructor(props: PropertyProps) {
        super(props);
        this.prices = props.prices;
        this.stateCard = StatePropertyCard.FREE;
        this.owner = null;
        this.houses = null;
    }

    /** Купить недвижимость */
    buy(player: Player) {
        if (player.balance >= this.prices.buyProperty) { // достаточный ли баланс у игрока для покупки
            this.owner = player;
            player.property.push(this);
            player.payMoneyToTheBank(this.prices.buyProperty);
            this.stateCard = StatePropertyCard.BOUGHT;
            this.complete();
        } else {
            console.log('недостаточно денег');
        }
    }

    /** Заложить недвижимость */
    sell() {
        this.stateCard = StatePropertyCard.MORTAGED;
        this.complete();
    }

    /** Заплатить ренту владельку недвиги */
    rentPayment(player: Player) {
        if (this.owner) {
            const currentRent = calculateRent(this) as number;
            player.payMoneyToThePlayer(currentRent, this.owner);

            console.log(
                `игрок ${player.displayName} заплатил ${currentRent}$ игроку ${this.owner.displayName}`,
            );
        }
        this.complete();
    }
}

export default Property;
