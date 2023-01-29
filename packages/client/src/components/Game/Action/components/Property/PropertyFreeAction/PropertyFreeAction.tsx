import { FC } from 'react';
import ActionContent from '../../../ActionContent';
import { PropertyFreeActionProps } from './PropertyFreeAction.types';

const PropertyFreeAction:FC<PropertyFreeActionProps> = ({
    cell, text, handleBuy, handleRefuseToBuy,
}) => (
    <ActionContent
        text={text}
        acceptInfoBtn={{
            text: `Купить ${cell.card.prices.buyCard} $`,
            onClick: handleBuy,
        }}
        cancelInfoBtn={{
            text: 'Отмена',
            onClick: handleRefuseToBuy,
        }}
    />

);

export default PropertyFreeAction;
