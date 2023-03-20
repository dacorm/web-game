import PropertyCard from '../PropertyCard';
import { board } from '../../../Board/Board';

/** получаем минимальное количество домиков на одной ячейки определённого типа карты * */
export const getMinCountHouses = (card: PropertyCard) => {
    const arrayHouses = board
        .getCellByGroup(card?.group)
        ?.map((propertyCell) => (propertyCell?.card as PropertyCard)?.houses);

    const maxCountHouses = Math.min.apply(null, arrayHouses as number[]);

    return maxCountHouses;
};
