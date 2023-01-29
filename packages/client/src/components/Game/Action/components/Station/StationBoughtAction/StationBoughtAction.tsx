import { FC, useEffect } from 'react';
import { calculateStationRent } from '../../../../../../models/Cards/helpers/calculateStationRent';
import StationCard from '../../../../../../models/Cards/StationCard';
import ActionContent from '../../../ActionContent';
import { StationBoughtActionProps } from './StationBoughtAction.types';

const StationBoughtAction:FC<StationBoughtActionProps> = ({
    cell, player, text, handleCompleteAction, handleRentPayment,
}) => {
    useEffect(() => {
        const ownerIsCurrentPlayer = cell.card.owner === player;
        if (ownerIsCurrentPlayer) {
            handleCompleteAction();
        }
    }, []);

    return (
        <ActionContent
            text={text}
            acceptInfoBtn={{
                text: `Заплатить ${calculateStationRent(cell.card as StationCard)} $`,
                onClick: handleRentPayment,
            }}
        />

    );
};

export default StationBoughtAction;
