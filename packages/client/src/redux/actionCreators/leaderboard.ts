import { appDispatch } from '../store';
import {
    LeaderBoardActionsType, LeaderboardProps, TLeaderboardActions, UserResult,
} from '../types/leaderboard.types';
import { leaderboardApi } from '../../api/leaderBoard';

export const setLeaderboard = (data: UserResult[]): TLeaderboardActions => ({
    type: LeaderBoardActionsType.SET_LEADERBOARDS,
    payload: data,
});

export const fetchLeaderboards = (data: LeaderboardProps = {
    ratingFieldName: 'score',
    cursor: 0,
    limit: 100,
}) => async (dispatch: appDispatch) => {
    try {
        const res = await leaderboardApi.getLeaderboards(data);
        const response = await res.json();
        if (res.status === 200) {
            dispatch(setLeaderboard(response));
        } else {
            console.log('error while fetching leaderboards', data);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const sendLeaderboards = (data: UserResult) => async (dispatch: appDispatch) => {
    try {
        const res = await leaderboardApi.sendLeaderboards(data);
        const response = await res.json();
        if (res.status === 200) {
            dispatch(setLeaderboard(response));
        } else {
            console.log('error while sending leaderboards data', data);
        }
    } catch (e) {
        console.warn(e);
    }
};
