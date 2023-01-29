import { FC } from 'react';
import ActionContent from '../../../ActionContent';
import { StationFreeActionProps } from './StationFreeAction.types';

const StationFreeAction:FC<StationFreeActionProps> = ({
    cell, text, handleBuy, handleRefuseToBuy,
}) => (
    <ActionContent
        text={text}
        acceptInfoBtn={
            {
                text: `Купить ${cell?.card.prices.buyCard} $`,
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

export default StationFreeAction;
