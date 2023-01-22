import { Player } from '../Player/Player';
import { IBoard } from './Board.types';
import { boardStageData } from '../../core/BoardStage/helpers/boardStageData';

class Board implements IBoard {
    stage: ReturnType<typeof boardStageData> | undefined;

    players: Player[] = [];

    currentTurn: number|null = null;

    generatorMoveSequence: any;

    get cells() {
        return this.stage?.cells;
    }

    getCell(index: number) {
        if (this.stage) {
            return this.stage.cells?.find((_v, i) => i === index);
        }
        return undefined;
    }

    getPlayerById(id: number|null) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].userId === id) {
                return this.players[i];
            }
        }
        return null;
    }

    /** инициализация фишек */
    initAllPlayers() {
        if (this.players) {
            this.players.forEach((player) => player.init());
        }
    }

    /** перерисовка всех фишек */
    reDrawAllPlayers() {
        this.players.map((player) => player.reDraw());
    }

    /** генартор-функция последовательности ходов в зависимости от оставшихся игроков  */
    * generateMoveSequence() {
        if (this.players.length) {
            while (true) {
                for (let i = 0; i < this.players.length; i++) {
                    yield this.players[i].userId;
                }
            }
        }
    }

    /** создание генератора последовательности ходов в зависимости от оставшихся игроков */
    createGeneratorMoveSequnce() {
        this.generatorMoveSequence = this.generateMoveSequence();
    }

    /** установка следующего хода */
    setNextTurn() {
        this.currentTurn = this.generatorMoveSequence.next().value;
    }

    getCurrentTurn() {
        return this.currentTurn;
    }
}

export const board = new Board();

(window as any).board = board;
