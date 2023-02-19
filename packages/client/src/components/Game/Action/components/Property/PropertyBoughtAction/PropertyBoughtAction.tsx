import {
    FC, useEffect,
} from 'react';
import { calculatePropertyRent } from '../../../../../../models/Cards/helpers/calculatePropertyRent';
import PropertyCard from '../../../../../../models/Cards/PropertyCard';
import ActionContent from '../../../ActionContent';
import { PropertyBoughtActionProps } from './PropertyBoughtAction.types';

const PropertyBoughtAction: FC<PropertyBoughtActionProps> = ({
    cell, player, text, handleCompleteAction, handleRentPayment,
}) => {
    const card = cell.card as PropertyCard;
    // если на купленную недвижку встал собственник то вызов комплита экшена
    useEffect(() => {
        const ownerIsCurrentPlayer = card.owner === player;
        if (ownerIsCurrentPlayer) {
            handleCompleteAction();
        }
    }, []);

    return (
        <ActionContent
            text={text}
            acceptInfoBtn={{
                text: `Заплатить ${calculatePropertyRent(card)} $`,
                onClick: handleRentPayment,
            }}
        />

    );
};

export default PropertyBoughtAction;
