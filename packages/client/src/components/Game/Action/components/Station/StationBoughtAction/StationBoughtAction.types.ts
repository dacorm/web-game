import { Cell } from '../../../../../../models/Cell/Cell';
import { Player } from '../../../../../../models/Player/Player';

export interface StationBoughtActionProps {
    cell: Cell
    player: Player
    text: string
    handleCompleteAction: () => void
    handleRentPayment: () => void
}
