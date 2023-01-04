import { Player } from '../Player/Player';
import { Cell } from '../Cell/Cell';
import { IBoard } from './Board.types';

class Board implements IBoard {
    cells: Cell[] = [];

    players: Player[] = [];

    getCellById(id: number) {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].id === id) {
                return this.cells[i];
            }
        }
        return null;
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

const board = new Board();

// для дебага
(window as any).board = board;

export default board;
