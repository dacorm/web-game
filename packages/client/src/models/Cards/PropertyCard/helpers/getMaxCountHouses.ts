import PropertyCard from '../PropertyCard';
import { board } from '../../../Board/Board';

/** получаем максимальное количество домиков на одной ячейки определённого типа карты * */
export const getMaxCountHouses = (card: PropertyCard) => {
    const arrayHouses = board
        .getCellByGroup(card?.group)
        ?.map((propertyCell) => (propertyCell?.card as PropertyCard)?.houses);

    const maxCountHouses = Math.max.apply(null, arrayHouses as number[]);

    return maxCountHouses;
};
