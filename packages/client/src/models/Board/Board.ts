import { Player } from '../Player/Player';
import { IBoard } from './Board.types';
import { boardStageData } from '../../core/BoardStage/helpers/boardStageData';
import { BoardCellGroup } from '../../core/types';
import PropertyCard from '../Cards/PropertyCard';

class Board implements IBoard {
    stage: ReturnType<typeof boardStageData> | undefined;

    players: Player[] = [];

    currentTurn: number | null = null;

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

    getCellByGroup(group: BoardCellGroup) {
        const cells = this.cells?.filter(
            (cell) => (cell?.card as PropertyCard)?.group === group,
        );
        console.log('cells - ', cells);
        return cells;
    }

    endGame() {
        this.stage = undefined;
        this.currentTurn = null;
        this.players = [];
        this.generatorMoveSequence = undefined;
    }

    getPlayerById(id: number | null) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].userId === id) {
                return this.players[i];
            }
        }
        return null;
    }

    getPlayers() {
        return this.players;
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
                let playerLength = this.players.length;
                for (let i = 0; i < this.players.length; playerLength === this.players.length ? i++ : null) {
                    playerLength = this.players.length;
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
if (typeof window !== 'undefined') {
    (window as any).board = board;
}
