import { Player } from '../../../Player/Player';
import { StateCard } from '../../Card/Card.types';
import PropertyCard from '../PropertyCard';

export const getCanRebuyProperty = (card: PropertyCard, player: Player) => card.owner?.userId === player.userId && card.stateCard === StateCard.MORTAGED;
