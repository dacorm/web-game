import { BoardCellGroup, BoardCellType } from '../../../core/types';
import Property from './PropertyCard/PropertyCard';

export interface ICard {
    name: string
    type: BoardCellType
    group: BoardCellGroup
}

export interface CardProps {
    name: string
    type: BoardCellType
    group: BoardCellGroup
}

export type TCard = Property
