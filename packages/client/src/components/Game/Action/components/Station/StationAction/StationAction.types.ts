import { Cell } from '../../../../../../models/Cell/Cell';
import { Player } from '../../../../../../models/Player/Player';

export interface StationActionProps {
    cell: Cell
    player: Player
    handleCompleteAction: () => void
    handleRentPayment: () => void
    handleBuy: () => void
    handleRefuseToBuy: () => void
}
