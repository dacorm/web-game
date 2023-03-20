import { StateCard } from '../../Card/Card.types';
import { board } from '../../../Board/Board';

import { getMinCountHouses } from './getMinCountHouses';

import PropertyCard from '../PropertyCard';
import { Player } from '../../../Player/Player';

/** может ли игрок купить дом */
export const getCanBuyHouse = (card: PropertyCard, player: Player): boolean => {
    const playerCanByHouse = player.canBuyHouse;
    const playerIsOwner = player.userId === card?.owner?.userId;
    const housesMoreThen4 = card?.houses >= 5;

    const minCountHouses = getMinCountHouses(card);
    const countHousesIsAllowed = card.houses <= minCountHouses;

    const isFullGroup = board
        .getCellByGroup(card?.group)
        ?.every(
            (propertyCell) => (propertyCell?.card as PropertyCard)?.owner === card?.owner
          && (propertyCell?.card as PropertyCard)?.stateCard === StateCard.BOUGHT,
        );
    const stateCardIsBought = card?.stateCard === StateCard.BOUGHT;

    return (playerCanByHouse
    && playerIsOwner
    && !housesMoreThen4
    && isFullGroup
    && countHousesIsAllowed
    && stateCardIsBought) as boolean;
};
