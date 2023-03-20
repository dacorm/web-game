import { Cell } from '../../../../../models/Cell/Cell';
import { Player } from '../../../../../models/Player/Player';

export interface PropertyModalContentProps {
  cell: Cell
  player: Player
  closeModal: () => void
}
