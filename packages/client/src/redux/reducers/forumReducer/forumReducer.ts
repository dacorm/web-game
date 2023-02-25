import { ForumActionTypes, forumState } from '../../types/forumReducer.types';
import { ActionType } from '../../store';

const initialState: forumState = {
    themes: [],
    countThemes: 0,
};

const initialAction = { type: '__INIT__' };

export const forumReducer = (state = initialState, action:ActionType = initialAction) => {
    switch (action.type) {
    case ForumActionTypes.SET_THEMES:
        return {
            ...state,
            themes: action.payload,
        };
    case ForumActionTypes.SET_COUNT_THEMES:
        return {
            ...state,
            countThemes: action.payload,
        };
    default:
        return state;
    }
};
