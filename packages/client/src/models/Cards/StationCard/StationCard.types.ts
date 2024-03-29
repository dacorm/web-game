import { Cell } from '../../Cell/Cell';
import { TPricesStation } from '../../../core/BoardStage/helpers/boardStageData';
import { BoardCellType } from '../../../core/types';
import { Player } from '../../Player/Player';
import { StateCard } from '../Card/Card.types';

export interface IStationCard {
  prices: TPricesStation
  owner: null | Player
  stateCard: StateCard
  type: BoardCellType
  cell: Cell | null
}

export interface StationCardProps {
    name: string
    prices: TPricesStation
    type: BoardCellType
}
