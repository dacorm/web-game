import { FC, useCallback } from 'react';
import cn from 'classnames';
import PropertyCard from '../../../../../models/Cards/PropertyCard';
import { getCanBuyHouse } from '../../../../../models/Cards/PropertyCard/helpers/getCanBuyHouse';
import { getCanRebuyProperty } from '../../../../../models/Cards/PropertyCard/helpers/getCanRebuyProperty';
import { getCanSellHouse } from '../../../../../models/Cards/PropertyCard/helpers/getCanSellHouse';
import { getCanSellProperty } from '../../../../../models/Cards/PropertyCard/helpers/getCanSellProperty';
import Button from '../../../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../../../shared/ui/shared/shared.button.types';
import PropertyCardComponent from '../../../Cards/PropertyCard';

import styles from '../../ModalCard.module.css';
import { PropertyModalContentProps } from './PropertyModalContent.types';

export const PropertyModalContent: FC<PropertyModalContentProps> = ({
    cell,
    player,
    closeModal,
}) => {
    const card = cell?.card as PropertyCard;

    // проверка для покупки дома
    const isCanBuyHouse = useCallback(
        (): boolean => getCanBuyHouse(card, player),
        [player, card],
    );

    // проверка для продажи дома
    const isCanSellHouse = useCallback(
        (): boolean => getCanSellHouse(card, player),
        [player, card],
    );

    // проверка для закладывания недвижки
    const isCanSellProperty = useCallback(
        (): boolean => getCanSellProperty(card, player),
        [player, card],
    );
    // проверка для ребая недвижки
    const isCanRebuyProperty = useCallback(
        (): boolean => getCanRebuyProperty(card, player),
        [player, card],
    );

    const handleBuyHouse = useCallback(() => {
        card.buyHouse(player);
        closeModal();
    }, [card, player]);
    const handleSellHouse = useCallback(() => {
        card.sellHouse(player);
        closeModal();
    }, [card, player]);
    const handleSellProperty = useCallback(() => {
        card.sell(player);
        closeModal();
    }, [card, player]);
    const handleRebuyProperty = useCallback(() => {
        card.rebuy(player);
        closeModal();
    }, [card, player]);

    return (
        <>
            <div className={styles.formWrapper}>
                <PropertyCardComponent cell={cell} />
            </div>
            <div className={styles.buttons}>
                {isCanRebuyProperty() ? (
                    <Button
                        size={ButtonSize.M}
                        theme={ButtonTheme.RED}
                        onClick={isCanRebuyProperty() ? handleRebuyProperty : undefined}
                        className={cn(!isCanRebuyProperty() && styles.disabled)}
                    >
                        Выкупить
                    </Button>
                ) : (
                    <Button
                        size={ButtonSize.M}
                        theme={ButtonTheme.RED}
                        onClick={isCanSellProperty() ? handleSellProperty : undefined}
                        className={cn(!isCanSellProperty() && styles.disabled)}
                    >
                        Заложить
                    </Button>
                )}

                <Button
                    size={ButtonSize.M}
                    theme={ButtonTheme.RED}
                    onClick={isCanSellHouse() ? handleSellHouse : undefined}
                    className={cn(!isCanSellHouse() && styles.disabled)}
                >
                    Продать дом
                </Button>
                <Button
                    size={ButtonSize.M}
                    theme={ButtonTheme.GREEN}
                    onClick={isCanBuyHouse() ? handleBuyHouse : undefined}
                    className={cn(!isCanBuyHouse() && styles.disabled)}
                >
                    Построить дом
                </Button>
            </div>
        </>
    );
};
