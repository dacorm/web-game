import type { Player } from '../../../models/Player/Player';
import { Cell } from '../../../models/Cell/Cell';

export interface ActiveCanvasProps {
    width: number;
    height: number;
    squares?: number[]
}

export type TAnimateFunc = (cell: Cell, player: Player) => void
