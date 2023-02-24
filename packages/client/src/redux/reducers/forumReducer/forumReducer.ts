import { ForumActionTypes, forumState } from '../../types/forumReducer.types';
import { ActionType } from '../../store';

const initialState: forumState = {
    themes: [],
};

const initialAction = { type: '__INIT__' };

export const forumReducer = (state = initialState, action:ActionType = initialAction) => {
    switch (action.type) {
    case ForumActionTypes.SET_THEMES:
        return {
            themes: action.payload,
        };

    default:
        return state;
    }
};
