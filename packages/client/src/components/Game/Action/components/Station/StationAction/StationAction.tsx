import React, { FC } from 'react';
import { StateCard } from '../../../../../../models/Cards/Card/Card.types';
import StationCard from '../../../../../../models/Cards/StationCard';
import StationBoughtAction from '../StationBoughtAction';
import StationFreeAction from '../StationFreeAction';
import { StationActionProps } from './StationAction.types';

const StationAction:FC<StationActionProps> = ({
    cell, player, handleBuy, handleRefuseToBuy, handleCompleteAction, handleRentPayment,
}) => {
    const card = cell.card as StationCard;
    const STATION_ACTION_TEXT = {
        StationFree: 'Вы попали на жд станцию, желаете купить?',
        StationBought: `Вам необходимо заплатить ренту игроку ${card?.owner?.displayName}`,
    };
    // если станция свободна
    if (card.stateCard === StateCard.FREE) {
        return (
            <StationFreeAction
                cell={cell}
                text={STATION_ACTION_TEXT.StationFree}
                handleBuy={handleBuy}
                handleRefuseToBuy={handleRefuseToBuy}
            />
        );
    }
    // если станция куплена
    if (card.stateCard === StateCard.BOUGHT) {
        return (
            <StationBoughtAction
                cell={cell}
                player={player}
                text={STATION_ACTION_TEXT.StationBought}
                handleCompleteAction={handleCompleteAction}
                handleRentPayment={handleRentPayment}
            />
        );
    }
    return <div />;
};

export default StationAction;
