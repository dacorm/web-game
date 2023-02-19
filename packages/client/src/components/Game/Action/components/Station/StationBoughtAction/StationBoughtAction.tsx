import { FC, useEffect } from 'react';
import { calculateStationRent } from '../../../../../../models/Cards/helpers/calculateStationRent';
import StationCard from '../../../../../../models/Cards/StationCard';
import ActionContent from '../../../ActionContent';
import { StationBoughtActionProps } from './StationBoughtAction.types';

const StationBoughtAction:FC<StationBoughtActionProps> = ({
    cell, player, text, handleCompleteAction, handleRentPayment,
}) => {
    const card = cell.card as StationCard;
    useEffect(() => {
        const ownerIsCurrentPlayer = card.owner === player;
        if (!ownerIsCurrentPlayer) {
            return;
        }
        handleCompleteAction();
    }, []);

    return (
        <ActionContent
            text={text}
            acceptInfoBtn={{
                text: `Заплатить ${calculateStationRent(card)} $`,
                onClick: handleRentPayment,
            }}
        />

    );
};

export default StationBoughtAction;
