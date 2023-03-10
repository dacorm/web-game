import { Cell } from '../../../../../../models/Cell/Cell';
import { Player } from '../../../../../../models/Player/Player';

export interface PropertyBoughtActionProps {
    cell: Cell
    player: Player
    text: string
    handleCompleteAction: () => void
    handleRentPayment: () => void
}
