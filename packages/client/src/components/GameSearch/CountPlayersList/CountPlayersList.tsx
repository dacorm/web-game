import { FC } from 'react';
import CountPlayerItem from '../CountPlayerItem';

import styles from './CountPlayersList.module.css';
import { CountPlayersListProps } from './CountPlayersList.types';

const CountPlayersList: FC<CountPlayersListProps> = ({
    countPlayersAll,
    countPlayers,
    handleClick,
}) => (
    <>
        <input type="number" value={countPlayers || 0} hidden readOnly />
        <div className={styles.countPlayers}>
            {countPlayersAll.map((count) => (
                <CountPlayerItem
                    key={count}
                    count={count}
                    onClick={handleClick}
                    isActive={count === countPlayers}
                />
            ))}
        </div>
    </>
);

export default CountPlayersList;
