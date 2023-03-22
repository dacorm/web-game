import { FC, useCallback } from 'react';
import TaxCard from '../../../../../models/Cards/TaxCard';
import ActionContent from '../../ActionContent';
import { TaxActionProps } from './TaxAction.types';

const TaxAction: FC<TaxActionProps> = ({ cell, player }) => {
    const card = cell.card as TaxCard;
    const ACTION_TEXT = 'Вы попали на Подоходный налог, необходимо заплатить 150$';

    const handlePayTax = useCallback(() => {
        card.payTax(player);
    }, [card, player]);

    return (
        <ActionContent
            text={ACTION_TEXT}
            acceptInfoBtn={{ text: 'Заплатить 150 $', onClick: handlePayTax }}
        />
    );
};

export default TaxAction;
