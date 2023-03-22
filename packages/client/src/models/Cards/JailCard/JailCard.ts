import {
    addNewGameChatMessage,
    rollTheDiceTrue,
    actionStop, startCellMoving, rollTheDiceFalse, rollTheDice,
} from '../../../redux/actionCreators/game';

import { Card } from '../Card/Card';
import { Player } from '../../Player/Player';
import store from '../../../redux/store';

class JailCard extends Card {
    sendPlayerToJail(player:Player) {
        this.complete();
        player.countMoves = 0;
        player.sendPlayerToCellWithoutStartAndAction(30);
        player.prisoner = true;
    }

    tryToEscape(player: Player) {
        if (player.countMoves >= 3) {
            console.log('исчерпались попытки');
            return;
        }
        player.countMoves++;
        store.dispatch(rollTheDice());
        const random = store.getState().game.rollTheDice;
        const isDouble = random[0] === random[1];

        if (isDouble) {
            store.dispatch(
                addNewGameChatMessage({
                    playerName: player.displayName,
                    message: 'сбежал из тюрьмы',
                }),
            );
            player.prisoner = false;
            store.dispatch(actionStop());
            store.dispatch(startCellMoving());
            store.dispatch(rollTheDiceFalse());
        } else {
            store.dispatch(
                addNewGameChatMessage({
                    playerName: player.displayName,
                    message: 'попытался сбежать из тюрьмы, но его поймали',
                }),
            );
            this.complete();
        }
    }

    static buyFreedom(player: Player): void|undefined {
        const payment = player.payMoneyToTheBank(50);
        if (!payment) {
            return;
        }
        store.dispatch(
            addNewGameChatMessage({
                playerName: player.displayName,
                message: 'заплатил штраф 50$ и вышел из тюрьмы',
            }),
        );
        player.prisoner = false;
        store.dispatch(actionStop());
        store.dispatch(rollTheDiceTrue());
    }
}

export default JailCard;
