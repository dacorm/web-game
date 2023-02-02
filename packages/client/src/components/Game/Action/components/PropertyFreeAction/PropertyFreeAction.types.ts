import { Cell } from '../../../../../models/Cell/Cell';
import { Player } from '../../../../../models/Player/Player';

export interface PropertyFreeActionProps {
    cell: Cell
    player: Player
    handleCompleteAction: () => void
}
