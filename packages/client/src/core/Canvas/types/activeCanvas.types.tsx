import { Cell } from '../../../models/Cell/Cell';

export interface activeCanvasProps {
    width: number;
    height: number;
    squares?: number[]
}

export type TAnimateFunc = (cell: Cell, updatedCurrentPos: number) => void
