import { ActionType } from '../../store';
import { LeaderBoardActionsType, LeaderBoardState } from '../../types/leaderboard.types';

const initialState: LeaderBoardState = {
    entities: [],
};

const initialAction = { type: '__INIT__' };

export const leaderboardReducer = (state = initialState, action: ActionType = initialAction) => {
    switch (action.type) {
    case LeaderBoardActionsType.SET_LEADERBOARDS:
        return {
            ...state,
            entities: [...action.payload],
        };
    default:
        return state;
    }
};
