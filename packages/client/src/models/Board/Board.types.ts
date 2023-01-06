import { Cell } from '../Cell/Cell';
import { Player } from '../Player/Player';

export interface IBoard {
    cells: Cell[];
    players: Player[];
    getCellById(id: number): Cell | null
    getPlayerById(id: number): Player | null
}
