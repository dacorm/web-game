import { FC, useCallback } from 'react';
import Button from '../../../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../../../shared/ui/shared/shared.button.types';
import PropertyCard from '../../../Cards/PropertyCard';

import styles from './PropertyFreeAction.module.css';
import { PropertyFreeActionProps } from './PropertyFreeAction.types';

const PropertyFreeAction:FC<PropertyFreeActionProps> = ({ cell, player, handleCompleteAction }) => {
    const handleBuy = useCallback(() => {
        const card = cell?.card;
        if (card) {
            card.buy(player);
        }
    }, [cell]);

    return (
        <div className={styles.actionProperty}>
            <div className={styles.actionInner}>
                <PropertyCard cell={cell} />
                <div className={styles.buttons}>
                    <Button
                        className={styles.buttonBuy}
                        theme={ButtonTheme.GREEN}
                        size={ButtonSize.M}
                        onClick={handleBuy}
                    >
                        Купить
                        {' '}
                        {cell.card.prices.buyProperty}
                        {' '}
                        $

                    </Button>
                    <Button
                        className={styles.buttonSell}
                        theme={ButtonTheme.RED}
                        size={ButtonSize.M}
                        onClick={handleCompleteAction}
                    >
                        Отмена

                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyFreeAction;
