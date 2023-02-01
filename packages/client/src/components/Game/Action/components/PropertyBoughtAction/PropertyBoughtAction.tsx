import { FC, useCallback, useEffect } from 'react';
import { calculateRent } from '../../../../../models/Cards/helpers/calculateRent';

import Button from '../../../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../../../shared/ui/shared/shared.button.types';
import PropertyCard from '../../../Cards/PropertyCard';

import styles from './PropertyBoughtAction.module.css';
import { PropertyBoughtActionProps } from './PropertyBoughtAction.types';

const PropertyBoughtAction: FC<PropertyBoughtActionProps> = ({ cell, player, handleCompleteAction }) => {
    const handleRentPayment = useCallback(() => {
        const card = cell?.card;
        if (card) {
            card.rentPayment(player);
        }
    }, [cell]);

    // если на купленную недвижку встал собственник то вызов комплита экшена
    useEffect(() => {
        const ownerIsCurrentPlayer = cell.card.owner === player;
        if (ownerIsCurrentPlayer) {
            handleCompleteAction();
        }
    }, []);

    return (
        <div className={styles.bought}>
            <PropertyCard cell={cell} />
            <Button size={ButtonSize.M} theme={ButtonTheme.RED} onClick={handleRentPayment} className={styles.btnBought}>
                Заплатить
                {' '}
                {calculateRent(cell.card)}
                {' '}
                $
            </Button>
        </div>
    );
};

export default PropertyBoughtAction;
