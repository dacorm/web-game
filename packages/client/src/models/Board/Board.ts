import { Player } from '../Player/Player';
import { IBoard } from './Board.types';
import { boardStageData } from '../../core/BoardStage/helpers/boardStageData';

class Board implements IBoard {
    stage: ReturnType<typeof boardStageData> | undefined;

    players: Player[] = [];

    get cells() {
        return this.stage?.cells;
    }

    getCell(index: number) {
        if (this.stage) {
            return this.cells?.find((_v, i) => i === index);
        }
    }

    getPlayerById(id: number) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].userId === id) {
                return this.players[i];
            }
        }
        return null;
    }
}

export const board = new Board();
