import { Cell } from '../../../../../../models/Cell/Cell';
import { Player } from '../../../../../../models/Player/Player';

export interface PropertyActionProps {
    cell: Cell
    player: Player
    handleCompleteAction: () => void
    handleRentPayment: () => void
    handleRefuseToBuy: () => void
    handleBuy: () => void
}
