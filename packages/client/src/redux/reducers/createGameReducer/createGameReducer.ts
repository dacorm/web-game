import {
    CreateGameActyonTypes,
    CreateGameReducerState,
    Game,
    TCreateGameAction,
} from '../../types/createGameReducer.types';

const initialState : CreateGameReducerState = {
    games: null,
    statusWS: null,
};
const initialAction: TCreateGameAction = {
    type: CreateGameActyonTypes.__INIT__,
};

function getIdsofGamesfromState(state:CreateGameReducerState) {
    const idsGames: number[] = [];
    state!.games!.forEach((game:Game) => {
        if (game?.id) {
            idsGames.push(game.id);
        }
    });
    return idsGames;
}

export const createGameReducer = (state = initialState, action:TCreateGameAction = initialAction) => {
    let idsGames: number[];
    const newGames: Game[] = [];
    switch (action.type) {
    case CreateGameActyonTypes.ADD_GAMES:
        if (state!.games!.length > 0) {
            idsGames = getIdsofGamesfromState(state);

            if (action.payload.length > 0) {
                action.payload.forEach((game: Game) => {
                    if (!idsGames.includes(game.id)) {
                        state!.games!.push(game);
                    }
                });
            }
        } else {
            return {
                ...state,
                games: [...action.payload],
            };
        }

        return {
            ...state,
            games: [...newGames],
        };

    case CreateGameActyonTypes.ADD_USER_TO_GAME:
        // eslint-disable-next-line no-case-declarations
        let iDsGames: number[];
        if (state!.games!.length > 0) {
            iDsGames = getIdsofGamesfromState(state);
            if (iDsGames.includes(Number(action.payload.gameId))) {
                state!.games!.forEach((game) => {
                    if (game.id === Number(action.payload.gameId)) {
                        game.players.push(action.payload.user);
                    }
                });
            }
        }
        return {
            ...state,
            games: state.games,
        };

    case CreateGameActyonTypes.SET_WS_STATUS: {
        return {
            ...state, statusWS: action.payload,
        };
    }
    default: return state;
    }
};
