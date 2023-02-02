import { TPricesProperty } from '../../../../core/BoardStage/helpers/boardStageData';
import { BoardCellGroup, BoardCellType } from '../../../../core/types';
import { Player } from '../../../Player/Player';

export enum StatePropertyCard {
    FREE = 'free', // никем не приобретена
    BOUGHT = 'bought', // куплена
    MORTAGED = 'mortgaged' // заложена
}

export interface IProperty {
    prices: TPricesProperty
    owner: null | Player
    stateCard: StatePropertyCard
    houses: number|null
    type: BoardCellType
    group: BoardCellGroup
}

export interface PropertyProps {
    name: string
    group: BoardCellGroup
    prices: TPricesProperty
    type: BoardCellType
}
