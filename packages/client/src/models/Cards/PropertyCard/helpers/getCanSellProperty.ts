import { board } from '../../../Board/Board';
import { Player } from '../../../Player/Player';
import { StateCard } from '../../Card/Card.types';
import PropertyCard from '../PropertyCard';

export const getCanSellProperty = (card: PropertyCard, player:Player) => {
    const zeroHousesAllCard = board.getCellByGroup(card?.group)?.every((cell) => (cell?.card as PropertyCard)?.houses === 0);
    return (
        card.owner?.userId === player.userId
      && card.stateCard === StateCard.BOUGHT
      && zeroHousesAllCard
    );
};
