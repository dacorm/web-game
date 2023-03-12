import { Cell } from '../../Cell/Cell';
import { BoardCellType } from '../../../core/types';
import BoxCard from '../BonusCard/BoxCard/BoxCard';
import PropertyCard from '../PropertyCard/PropertyCard';
import StationCard from '../StationCard';
import TaxCard from '../TaxCard';

export interface ICard {
    name: string
    type: BoardCellType

}

export interface CardProps {
    name: string
    type: BoardCellType

}

export enum StateCard {
    FREE = 'free', // никем не приобретена
    BOUGHT = 'bought', // куплена
    MORTAGED = 'mortgaged' // заложена
}

export type TCard = PropertyCard | StationCard | BoxCard | TaxCard | JailCard
