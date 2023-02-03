import { board } from '../../../models/Board/Board';
import { ActionType } from '../../store';
import { GameActionTypes, userGame } from '../../types/gameReducer.types';

const initialState: userGame = {
    id: null,
    type: undefined,
    random: [0, 0],
    cellIsMoving: false,
    canRollTheDice: false,
    currentPlayer: { displayName: null, userId: null },
    actionStarting: false,
    turnCompleted: false,
    players: [],
    isGameStarting: false,
};

const initialAction = { type: '__INIT__' };

export const gameReducer = (state:userGame = initialState, action:ActionType = initialAction): any => {
    switch (action.type) {
    case GameActionTypes.START_GAME:
        console.log('HHHHHHHHHHHHHHHHHHHHHH');
        return {
            ...state,
            isGameStarting: true,
        };
    case GameActionTypes.CELL_START_MOVING:
        return {
            ...state,
            cellIsMoving: true,
        };
    case GameActionTypes.SET_RANDOM:
        return {
            ...state,
            random: action.payload,
        };
    case GameActionTypes.SET_GAME_ID:
        return {
            ...state,
            id: action.payload,
        };
    case GameActionTypes.SET_GAME_TYPE:
        return {
            ...state,
            type: action.payload,
        };
    case GameActionTypes.SET_PLAYERS:
        return {
            ...state,
            players: action.payload,
        };
    case GameActionTypes.CELL_STOP_MOVING:
        return {
            ...state,
            cellIsMoving: false,
        };
    case GameActionTypes.SET_CURRENT_PLAYER: {
        board.setNextTurn();
        const currentTurn = board.getCurrentTurn();
        const player = board.getPlayerById(currentTurn);
        return {
            ...state,
            currentPlayer: player,
        };
    }
    case GameActionTypes.ROLL_THE_DICE_TRUE: {
        return {
            ...state,
            canRollTheDice: true,
        };
    }
    case GameActionTypes.ROLL_THE_DICE_FALSE: {
        return {
            ...state,
            canRollTheDice: false,
        };
    }
    case GameActionTypes.ACTION_START: {
        return {
            ...state,
            actionStarting: true,
        };
    }
    case GameActionTypes.ACTION_STOP: {
        return {
            ...state,
            actionStarting: false,
        };
    }
    case GameActionTypes.TURN_START: {
        return {
            ...state,
            turnCompleted: false,
        };
    }
    case GameActionTypes.TURN_STOP: {
        return {
            ...state,
            turnCompleted: true,
        };
    }
    default:
        return state;
    }
};
