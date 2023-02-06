import { Cell } from '../../../../../../models/Cell/Cell';

export interface PropertyFreeActionProps {
    cell: Cell
    text: string
    handleBuy: () => void
    handleRefuseToBuy: () => void
}
