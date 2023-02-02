import { FC } from 'react';
import LeaderBoardUserItem from '../LeaderBoardUserItem';
import { LeaderBoardUserListProps } from './LeaderBoardUserList.types';

const LeaderBoardUserList: FC<LeaderBoardUserListProps> = ({ leaders }) => (
    <tbody>
        {leaders.map(({
            place, name, points, games,
        }) => (
            <LeaderBoardUserItem
                place={place}
                name={name}
                points={points}
                games={games}
                key={name + place}
            />
        ))}
    </tbody>
);

export default LeaderBoardUserList;
