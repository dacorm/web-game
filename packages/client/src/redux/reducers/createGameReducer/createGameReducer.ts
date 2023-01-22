import { CreateGameActyonTypes, Games } from '../../types/createGameReducer.types';

const initialState : Games = {
    games: [],
};
const initialAction = {
    type: '__INIT__',
    payload: undefined,
};

export const createGameReducer = (state = initialState, action = initialAction) => {
    switch (action.type) {
    case CreateGameActyonTypes.CREATE_GAME:
        return {
            ...state,
            games: [...state.games, action.payload],
        };
    default: return state;
    }
};
