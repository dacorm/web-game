import { FC, useRef } from 'react';
import cn from 'classnames';

import styles from './PropertyCardComponent.module.css';
import PropertyCard from '../../../../models/Cards/PropertyCard';
import { PropertyCardProps } from './PropertyCardComponent.types';

const PropertyCardComponent:FC<PropertyCardProps> = ({ cell }) => {
    const card = useRef<PropertyCard>(cell?.card as PropertyCard);
    return (
        <div className={styles.card}>
            <div className={cn(styles.title, styles[card.current.group])}>
                <div className={styles.titleText}>{card.current.name}</div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.renta}>
                        <div className={styles.dollar}>$</div>
                        <ul className={cn(styles.rentaUl, styles.ul)}>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>РЕНТА БЕЗ СТРОЕНИЙ</div>
                                <div className={styles.rightItem}>{card.current.prices.rentWithoutBuildings}</div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 1 дом</div>
                                <div className={styles.rightItem}>{card.current.prices.rentWithOneHouse}</div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 2 дома</div>
                                <div className={styles.rightItem}>{card.current.prices.rentWithTwoHouse}</div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 3 дома</div>
                                <div className={styles.rightItem}>{card.current.prices.rentWithThreeHouse}</div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>- 4 дома</div>
                                <div className={styles.rightItem}>{card.current.prices.rentWithFourHouse}</div>
                            </li>
                            <li className={cn(styles.rentaItem, styles.li)}>
                                <div className={styles.leftItem}>РЕНТА С ОТЕЛЕМ</div>
                                <div className={styles.rightItem}>{card.current.prices.rentWithHotel}</div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.double}>
                        <div className={styles.doubleText}>
                            Если игроку принадлежит
                            {' '}
                            <b>всё </b>
                            имущество одной цветовой
                            группы, рента
                            {' '}
                            <b>удваивается</b>
                        </div>
                    </div>
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <div className={styles.leftItem}>Постройка дома</div>
                            <div className={styles.rightItem}>{card.current.prices.buyHouse}</div>
                        </li>
                        <li className={styles.li}>
                            <div className={styles.leftItem}>Постройка отеля</div>
                            <div className={styles.rightItem}>{card.current.prices.buyHouse}</div>
                        </li>
                        <li className={cn(styles.li, styles.pledge)}>
                            <div className={styles.leftItem}>Залог</div>
                            <div className={styles.rightItem}>{card.current.prices.sellCard}</div>
                        </li>
                        <li className={cn(styles.li, styles.price)}>
                            <div className={styles.leftItem}>Цена</div>
                            <div className={styles.rightItem}>{card.current.prices.buyCard}</div>
                        </li>
                        <li className={styles.li}>
                            <div className={styles.leftItem}>Владелец</div>
                            <div className={styles.rightItem}>
                                {card.current.owner ? card.current.owner.displayName : 'нету'}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PropertyCardComponent;
