import { FC, useCallback } from 'react';
import cn from 'classnames';
import PropertyCard from '../../../../../models/Cards/PropertyCard';
import { getCanRebuyProperty } from '../../../../../models/Cards/PropertyCard/helpers/getCanRebuyProperty';
import { getCanSellProperty } from '../../../../../models/Cards/PropertyCard/helpers/getCanSellProperty';
import Button from '../../../../../shared/ui/Button';
import { ButtonSize, ButtonTheme } from '../../../../../shared/ui/shared/shared.button.types';
import StationCardComponent from '../../../Cards/StationCard';
import styles from '../../ModalCard.module.css';
import { StationModalContentProps } from './StationModalContent.types';

export const StationModalContent: FC<StationModalContentProps> = ({
    cell,
    player,
    closeModal,
}) => {
    const card = cell?.card as PropertyCard;

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
                <StationCardComponent cell={cell} />
            </div>
            <div className={styles.buttons} style={{ justifyContent: 'center' }}>
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
            </div>
        </>
    );
};
