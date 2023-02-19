import { FC } from 'react';
import StationCard from '../../../../../../models/Cards/StationCard';
import ActionContent from '../../../ActionContent';
import { StationFreeActionProps } from './StationFreeAction.types';

const StationFreeAction:FC<StationFreeActionProps> = ({
    cell, text, handleBuy, handleRefuseToBuy,
}) => {
    const card = cell.card as StationCard;
    return (
        <ActionContent
            text={text}
            acceptInfoBtn={
                {
                    text: `Купить ${card.prices.buyCard} $`,
                    onClick: handleBuy,
                }
            }
            cancelInfoBtn={
                {
                    text: 'Отмена',
                    onClick: handleRefuseToBuy,
                }
            }
        />

    );
};

export default StationFreeAction;
