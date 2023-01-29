import { board } from '../../Board/Board';
import { Cell } from '../../Cell/Cell';
import PropertyCard from '../PropertyCard/PropertyCard';

/** расчет ренты относительно построек или владения полной сети недвижимости */
export const calculatePropertyRent = (card: PropertyCard) => {
    /** есть ли домики на карте и сколько их */
    const withHouses = card.houses;
    /** полная ли группа карточек у владельца */
    const isFullGroup = () => {
        const { group } = card;
        const { cells } = board;

        const groupedCells = cells?.filter((cell) => {
            if (cell.card) {
                return (cell?.card as PropertyCard).group === group;
            }
            return false;
        }) as Cell[];

        const isFull = !groupedCells.some((cell) => card.owner !== cell.card.owner);

        return isFull;
    };

    if (withHouses) {
        switch (withHouses) {
        case 1: {
            return card.prices.rentWithOneHouse;
        }
        case 2: {
            return card.prices.rentWithTwoHouse;
        }
        case 3: {
            return card.prices.rentWithThreeHouse;
        }
        case 4: {
            return card.prices.rentWithFourHouse;
        }
        case 5: {
            return card.prices.rentWithHotel;
        }
        default: {
            return null;
        }
        }
    }

    if (isFullGroup()) { // по правилам если у игрока полный контроль группы карточек то цена * 2
        return card.prices.rentWithoutBuildings * 2;
    }

    // если не выполняется ни одно из условий то возвращаем дефолт цену ренты
    return card.prices.rentWithoutBuildings;
};
