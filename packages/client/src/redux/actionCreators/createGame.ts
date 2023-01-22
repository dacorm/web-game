import { CreateGameActyonTypes } from '../types/createGameReducer.types';
import { Game } from '../../models/Game/Game';

export const createGame = (game:Game) => ({
    type: CreateGameActyonTypes.CREATE_GAME,
    payload: game,
});

export const addUserToGame = (game:Game, user) => ({
    type: CreateGameActyonTypes.ADD_USER_TO_GAME,
    payload: {
        game,
        user,
    },
});
