import type { Player } from '../../../models/Player/Player';
import { TPlayer } from '../../../pages/Game/Game.types';
import { Cell } from '../../../models/Cell/Cell';

export interface ActiveCanvasProps {
    width: number;
    height: number;
    players: TPlayer[] | null
    squares?: number[]
}

export type TAnimateFunc = (cell: Cell, player: Player) => void
