import type { Player } from '../../../models/Player/Player';
import { CellType } from '../../BoardStage/helpers/boardStageData';

export interface activeCanvasProps {
    width: number;
    height: number;
    squares?: number[]
}

export type TAnimateFunc = (cell: CellType, player: Player) => void
