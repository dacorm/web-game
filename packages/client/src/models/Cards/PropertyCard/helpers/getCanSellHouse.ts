import { getMaxCountHouses } from './getMaxCountHouses';
import { StateCard } from '../../Card/Card.types';
import PropertyCard from '../PropertyCard';
import { Player } from '../../../Player/Player';

/** может ли игрок купить дом */
export const getCanSellHouse = (card: PropertyCard, player: Player): boolean => {
    const playerIsOwner = player.userId === card?.owner?.userId;
    const housesMoreThen0 = card?.houses > 0;

    const maxCountHouses = getMaxCountHouses(card);
    const countHousesIsAllowed = card.houses === maxCountHouses;

    const stateCardIsBought = card?.stateCard === StateCard.BOUGHT;

    return (
    playerIsOwner
    && housesMoreThen0
    && countHousesIsAllowed
    && stateCardIsBought) as boolean;
};
