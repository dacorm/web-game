import { TPrices } from '../../../../core/BoardStage/helpers/boardStageData';
import { BoardCellType } from '../../../../core/types';
import { actionStop, turnStop } from '../../../../redux/actionCreators/game';
import store from '../../../../redux/store';
import { Player } from '../../../Player/Player';
import { calculateRent } from '../../helpers/calculateRent';
import { IProperty, PropertyProps, StatePropertyCard } from './PropertyCard.types';

class Property implements IProperty {
    prices: TPrices;

    owner: null | Player;

    stateCard: StatePropertyCard;

    name;

    type;

    group;

    houses: number | null;

    constructor(props: PropertyProps) {
        this.prices = props.prices;
        this.name = props.name;
        this.group = props.group;
        this.type = BoardCellType.property;
        this.stateCard = StatePropertyCard.FREE;
        this.owner = null;
        this.houses = null;
    }

    /** Купить недвижимость */
    buy(player: Player) {
        if (player.balance >= this.prices.buyProperty) { // достаточный ли баланс у игрока для покупки
            this.owner = player;
            player.property.push(this);
            player.balance -= this.prices.buyProperty;
            this.stateCard = StatePropertyCard.BOUGHT;
            this.complete();
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
            player.balance -= currentRent;
            this.owner.balance += currentRent;

            console.log(
                `игрок ${player.displayName} заплатил ${currentRent}$ игроку ${this.owner.displayName}`,
            );
        }
        this.complete();
    }

    // todo: в общий класс карты нужно вынести
    /** завершить экшен */
    /* eslint-disable-next-line */
    complete() {
        store.dispatch(actionStop());
        store.dispatch(turnStop());
        console.log('экшен карточки завершен');
    }
}

export default Property;
