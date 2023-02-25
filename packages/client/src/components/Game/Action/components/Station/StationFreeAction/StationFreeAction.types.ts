import { Cell } from '../../../../../../models/Cell/Cell';

export interface StationFreeActionProps {
    cell: Cell
    text: string
    handleBuy: () => void
    handleRefuseToBuy: () => void
}
