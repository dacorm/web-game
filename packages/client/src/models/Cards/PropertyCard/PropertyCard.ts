import { Cell } from '../../Cell/Cell';
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

    houses: number;

    canBuyHouse: boolean;

    group: BoardCellGroup;

    cell: Cell | null;

    constructor(props: PropertyCardProps) {
        super(props);
        this.prices = props.prices;
        this.stateCard = StateCard.FREE;
        this.owner = null;
        this.houses = 0;
        this.cell = null;
        this.group = props.group;
        this.canBuyHouse = true;
    }

    /** Купить недвижимость */
    buy(player: Player) {
        const payment = player.payMoneyToTheBank(this.prices.buyCard);
        if (!payment) return;

        this.changeOwner(player);
        player.property.push(this);

        this.stateCard = StateCard.BOUGHT;

        store.dispatch(
            addNewGameChatMessage({
                playerName: player.displayName,
                message: `приобретает ${this.name} за ${this.prices.buyCard} $`,
            }),
        );

        this.complete();
    }

    /** Выкупить заложенную недвижимость */
    rebuy(player: Player) {
        const payment = player.payMoneyToTheBank(this.prices.buyCard);
        if (!payment) return;

        this.stateCard = StateCard.BOUGHT;

        store.dispatch(
            addNewGameChatMessage({
                playerName: player.displayName,
                message: `выкупает ${this.name} за ${this.prices.buyCard} $`,
            }),
        );

        this.complete();
    }

    changeOwner(player: Player) {
        this.owner = player;
        if (this.cell) {
            this.cell.createColorOwner(player.fill);
        }
    }

    /** Воздержаться от покупки недвижимости */
    refuseToBuy() {
        store.dispatch(
            addNewGameChatMessage({
                playerName: store.getState().game.currentPlayer.displayName,
                message: 'решает воздержаться от покуки недвижимости',
            }),
        );

        this.complete();
    }

    /** Заложить недвижимость */
    sell(player: Player) {
        player.getMoney(this.prices.sellCard);
        this.stateCard = StateCard.MORTAGED;

        store.dispatch(
            addNewGameChatMessage({
                playerName: (this.owner as Player).displayName,
                message: `закладывает ${this.name} за ${this.prices.sellCard} $`,
            }),
        );

        this.complete();
    }

    /** Заплатить ренту владельку недвиги */
    rentPayment(player: Player) {
        if (this.owner) {
            const currentRent = calculatePropertyRent(this) as number;
            const payment = player.payMoneyToThePlayer(currentRent, this.owner);
            if (!payment) return;

            store.dispatch(
                addNewGameChatMessage({
                    playerName: player.displayName,
                    message: `выплачивает ренту игроку ${player.displayName} в размере ${currentRent} $`,
                }),
            );
        }
        this.complete();
    }

    changeCountHouse(val: 1 | -1) {
        this.houses += val;
        console.log('thishouses - ', this.houses);
        this.cell?.createHouse(this.houses);
    }

    buyHouse(player: Player) {
        const payment = player.payMoneyToTheBank(this.prices.buyHouse);
        if (!payment) return;
        this.changeCountHouse(1);
        player.setCanBuyHouse(false);

        store.dispatch(
            addNewGameChatMessage({
                playerName: player.displayName,
                message: `купил дом для ${this.name} за ${this.prices.buyHouse} $`,
            }),
        );
    }

    sellHouse(player: Player) {
        if (
            !StateCard.BOUGHT
          && player.userId !== this.owner?.userId
          && this.houses <= 0
        ) {
            console.log('no way');
            return;
        }
        player.getMoney(this.prices.buyHouse);

        this.changeCountHouse(-1);

        store.dispatch(
            addNewGameChatMessage({
                playerName: player.displayName,
                message: `продал дом у ${this.name} за ${this.prices.buyHouse / 2} $`,
            }),
        );
    }
}

export default PropertyCard;
