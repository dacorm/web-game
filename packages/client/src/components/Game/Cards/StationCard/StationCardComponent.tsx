import { FC } from 'react';
import cn from 'classnames';

import styles from '../PropertyCard/PropertyCardComponent.module.css';
import { Cell } from '../../../../models/Cell/Cell';
import StationCard from '../../../../models/Cards/StationCard';

export interface StationCardProps {
    cell: Cell
}

const StationCardComponent: FC<StationCardProps> = ({ cell }) => {
    console.log('cell - ', cell);
    const card = cell?.card;
    const isStationCard = card instanceof StationCard;

    if (!card || !isStationCard) {
        return <div>loading...</div>;
    }
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <div className={styles.titleText}>{card.name}</div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.renta}>
                        <div className={styles.dollar}>$</div>
                        <ul className={cn(styles.rentaUl, styles.ul)}>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 1 станция</div>
                                <div className={styles.rightItem}>
                                    {card.prices.rentWithOnePort}
                                </div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 2 станции</div>
                                <div className={styles.rightItem}>
                                    {card.prices.rentWithTwoPort}
                                </div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 3 станции</div>
                                <div className={styles.rightItem}>
                                    {card.prices.rentWithThreePort}
                                </div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 4 станции</div>
                                <div className={styles.rightItem}>
                                    {card.prices.rentWithFourPort}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <ul className={styles.ul}>
                        <li className={cn(styles.li, styles.pledge)}>
                            <div className={styles.leftItem}>Залог</div>
                            <div className={styles.rightItem}>{card.prices.sellCard}</div>
                        </li>
                        <li className={cn(styles.li, styles.price)}>
                            <div className={styles.leftItem}>Цена</div>
                            <div className={styles.rightItem}>{card.prices.buyCard}</div>
                        </li>
                        <li className={styles.li}>
                            <div className={styles.leftItem}>Владелец</div>
                            <div className={styles.rightItem}>
                                {card.owner ? card.owner.displayName : 'нету'}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StationCardComponent;
