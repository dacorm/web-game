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
    case CreateGameActyonTypes.ADD_USER_TO_GAME:
        console.log('reducer ', action.payload);
        action.payload.game.addUserToGame(action.payload.user);
        return {
            ...state,
            games: [...state.games],
        };
    default: return state;
    }
};
