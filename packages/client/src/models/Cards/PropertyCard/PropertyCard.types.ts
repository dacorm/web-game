import { TPricesProperty } from '../../../core/BoardStage/helpers/boardStageData';
import { BoardCellGroup, BoardCellType } from '../../../core/types';
import { Player } from '../../Player/Player';
import { StateCard } from '../Card/Card.types';

export interface IPropertyCard {
    prices: TPricesProperty
    owner: null | Player
    stateCard: StateCard
    houses: number|null
    type: BoardCellType
    group: BoardCellGroup
}

export interface PropertyCardProps {
    name: string
    group: BoardCellGroup
    prices: TPricesProperty
    type: BoardCellType
}
