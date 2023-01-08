import { Player } from '../Player/Player';
import { boardStageData, CellType } from '../../core/BoardStage/helpers/boardStageData';

export interface IBoard {
    stage: ReturnType<typeof boardStageData> | undefined;
    players: Player[];
    getPlayerById(id: number): Player | null;
    getCell(id: number): CellType | undefined
}
