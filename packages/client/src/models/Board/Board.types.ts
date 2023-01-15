import { Player } from '../Player/Player';
import { boardStageData } from '../../core/BoardStage/helpers/boardStageData';
import { Cell } from '../Cell/Cell';

export interface IBoard {
    stage: ReturnType<typeof boardStageData> | undefined;
    players: Player[];
    currentTurn: number|null;
    getPlayerById(id: number): Player | null;
    getCell(id: number): Cell | undefined
}
