import cn from 'classnames';
import { FC } from 'react';
import { CountPlayerItemProps } from './CountPlayerItem.types';

import styles from './CountPlayerItem.module.css';

const CountPlayerItem: FC<CountPlayerItemProps> = ({
    count,
    onClick,
    isActive,
}) => (
    <div
        className={cn(styles.countPlayerItem, {
            [styles.active]: isActive,
        })}
        onClick={onClick}
    >
        {count}
    </div>
);

export default CountPlayerItem;
