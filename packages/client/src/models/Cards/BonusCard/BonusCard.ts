import { Card } from '../Card/Card';
import { Player } from '../../Player/Player';
import { shuffle } from '../../../shared/utils/shuffle';
import { TInfoBtn } from '../../../components/Game/Action/ActionContent/ActionContent.types';
import { BonusCaseType } from './BonusCard.types';
import { TBoxCardCase } from './BoxCard/BoxCard.types';
import store from '../../../redux/store';
import { addNewGameChatMessage } from '../../../redux/actionCreators/game';

export default class BonusCard extends Card {
    getMoney(player:Player, value:number) {
        player.getMoney(value);
        this.complete();
    }

    payMoneyToTheBank(player:Player, value:number) {
        if (player.balance > value) {
            player.payMoneyToTheBank(value);
            this.complete();
        } else console.log('недостаточно денег');
    }

    static shuffleCases(cases: TBoxCardCase[]) {
        return shuffle(cases);
    }

    static sendPlayerToCellWithoutStart(player:Player, cellIndex:number) {
        player.sendPlayerToCellWithoutStart(cellIndex);
    }

    static sendPlayerToCellWithStart(player:Player, cellIndex:number) {
        player.sendPlayerToCellWithStart(cellIndex);
    }

    getActionInfoBtn(bonusCase: TBoxCardCase, player: Player):TInfoBtn {
        switch (bonusCase.type) {
        case BonusCaseType.PAY: {
            return {
                onClick: () => {
                    this.payMoneyToTheBank(player, bonusCase.value as number);
                    store.dispatch(addNewGameChatMessage(
                        {
                            playerName: player.displayName,
                            message: `заплатил ${bonusCase.value} $`,
                        },
                    ));
                },
                text: `Заплатить ${bonusCase.value} $`,
            };
        }
        case BonusCaseType.GET: {
            return {
                onClick: () => {
                    this.getMoney(player, bonusCase.value as number);
                    store.dispatch(addNewGameChatMessage(
                        {
                            playerName: player.displayName,
                            message: `получил ${bonusCase.value} $`,
                        },
                    ));
                },
                text: `Получить ${bonusCase.value} $`,
            };
        }
        case BonusCaseType.MOVING_WITHOUT_START: {
            return {
                onClick: () => BonusCard.sendPlayerToCellWithoutStart(player, bonusCase.cellIndex as number),
                text: 'Отправиться',
            };
        }
        case BonusCaseType.MOVING_WITH_START: {
            return {
                onClick: () => BonusCard.sendPlayerToCellWithStart(player, bonusCase.cellIndex as number),
                text: 'Отправиться',
            };
        }
        default: {
            return {
                onClick: () => this.getMoney(player, 0),
                text: 'Получить 0 $',
            };
        }
        }
    }
}
