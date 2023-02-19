import React, { FC } from 'react';
import { StateCard } from '../../../../../../models/Cards/Card/Card.types';
import PropertyCard from '../../../../../../models/Cards/PropertyCard';
import PropertyBoughtAction from '../PropertyBoughtAction';
import PropertyFreeAction from '../PropertyFreeAction';
import { PropertyActionProps } from './PropertyAction.types';

const PropertyAction:FC<PropertyActionProps> = ({
    cell, player, handleBuy, handleRefuseToBuy, handleRentPayment, handleCompleteAction,
}) => {
    const card = cell.card as PropertyCard;
    const PROPERTY_ACTION_TEXT = {
        PropertyBought: `Вам необходимо заплатить ренту игроку ${card.owner?.displayName}`,
        PropertyFree: `Вы попали на ${card.name}. Желаете приобрести?`,
    };

    // если недвижка ни кем не куплена
    if (card.stateCard === StateCard.FREE) {
        return (
            <PropertyFreeAction
                cell={cell}
                text={PROPERTY_ACTION_TEXT.PropertyFree}
                handleBuy={handleBuy}
                handleRefuseToBuy={handleRefuseToBuy}
            />
        );
    }

    // если недвижка кем то куплена
    if (card.stateCard === StateCard.BOUGHT) {
        return (
            <PropertyBoughtAction
                cell={cell}
                player={player}
                text={PROPERTY_ACTION_TEXT.PropertyBought}
                handleRentPayment={handleRentPayment}
                handleCompleteAction={handleCompleteAction}
            />
        );
    }

    return <div />;
};

export default PropertyAction;
