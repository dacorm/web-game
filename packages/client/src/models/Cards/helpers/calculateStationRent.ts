import StationCard from '../StationCard';

export const calculateStationRent = (card: StationCard) => {
    const countStations = card.owner?.stations.length;

    switch (countStations) {
    case 1: {
        return card.prices.rentWithOnePort;
    }
    case 2: {
        return card.prices.rentWithTwoPort;
    }
    case 3: {
        return card.prices.rentWithThreePort;
    }
    case 4: {
        return card.prices.rentWithFourPort;
    }
    default: {
        return null;
    }
    }
};
