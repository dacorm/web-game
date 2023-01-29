import { TPricesStation } from '../../../core/BoardStage/helpers/boardStageData';
import { addNewGameChatMessage } from '../../../redux/actionCreators/game';
import store from '../../../redux/store';
import { Player } from '../../Player/Player';
import { Card } from '../Card/Card';
import { StateCard } from '../Card/Card.types';
import { calculateStationRent } from '../helpers/calculateStationRent';
import { IStationCard, StationCardProps } from './StationCard.types';

class StationCard extends Card implements IStationCard {
    prices: TPricesStation;

    owner: null| Player;

    stateCard: StateCard;

    constructor(props: StationCardProps) {
        super(props);
        this.prices = props.prices;
        this.stateCard = StateCard.FREE;
        this.owner = null;
    }

    /** Купить станцию */
    buy(player: Player) {
        if (player.balance >= this.prices.sellCard) { // достаточный ли баланс у игрока для покупки
            this.owner = player;
            player.stations.push(this);
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

    /** Воздержаться от покупки жд */
    refuseToBuy() {
        store.dispatch(addNewGameChatMessage(
            {
                playerName: store.getState().game.currentPlayer.displayName,
                message: 'решает воздержаться от покуки жд дороги',
            },
        ));

        this.complete();
    }

    /** Заложить станцию */
    sell() {
        this.stateCard = StateCard.MORTAGED;
        this.complete();

        store.dispatch(addNewGameChatMessage(
            {
                playerName: (this.owner as Player).displayName,
                message: `закладывает ${this.name} за ${this.prices.sellCard} $`,
            },
        ));
    }

    /** Заплатить ренту владельку станции */
    rentPayment(player: Player) {
        if (this.owner) {
            const currentRent = calculateStationRent(this) as number;
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

export default StationCard;
