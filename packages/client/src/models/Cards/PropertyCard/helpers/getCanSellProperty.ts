import { Player } from '../../../Player/Player';
import { StateCard } from '../../Card/Card.types';
import PropertyCard from '../PropertyCard';

export const getCanSellProperty = (card: PropertyCard, player:Player) => card.owner?.userId === player.userId && card.stateCard === StateCard.BOUGHT && card.houses === 0;
