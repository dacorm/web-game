import { FC } from 'react';
import { AmountProps } from './Amount.types';

import styles from './Amount.module.css';

const Amount: FC<AmountProps> = ({ price }) => (
    <div className={styles.amount}>
        {price}
        {' '}
        $
    </div>
);

export default Amount;
