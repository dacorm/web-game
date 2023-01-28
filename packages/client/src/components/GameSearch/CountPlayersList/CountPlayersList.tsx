import { FC } from 'react';
import CountPlayerItem from '../CountPlayerItem';

import styles from './CountPlayersList.module.css';
import { CountPlayersListProps } from './CountPlayersList.types';

const CountPlayersList: FC<CountPlayersListProps> = ({ countPlayersAll, click, countPlayers }) => (
    <div className={styles.countPlayers}>
        {countPlayersAll.map((count) => (
            <CountPlayerItem
                key={count}
                count={count}
                onClick={click}
                isActive={count === countPlayers}
            />
        ))}
    </div>
);

export default CountPlayersList;
