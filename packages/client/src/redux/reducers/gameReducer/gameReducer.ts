import { TPlayer } from '../../../pages/Game/Game.types';
import { Util } from '../../../core/Util';
import { board } from '../../../models/Board/Board';
import { ActionType } from '../../store';
import { GameActionTypes, userGame } from '../../types/gameReducer.types';

const initialState: userGame = {
    cellIsMoving: false,
    canRollTheDice: false,
    currentPlayer: { displayName: null, userId: null },
    actionStarting: false,
    turnCompleted: false,
    players: [],
    activePlayers: [],
    messages: [],
    cellForModal: null,
    cardModalIsShow: false,
    rollTheDice: [0, 0],
};

const initialAction = { type: '__INIT__' };

export const gameReducer = (state:userGame = initialState, action:ActionType = initialAction): any => {
    switch (action.type) {
    case GameActionTypes.CELL_START_MOVING:
        return {
            ...state,
            cellIsMoving: true,
        };
    case GameActionTypes.CELL_STOP_MOVING:
        return {
            ...state,
            cellIsMoving: false,
        };
    case GameActionTypes.SET_CURRENT_PLAYER: {
        board.setNextTurn();
        const currentTurn = board.getCurrentTurn();
        console.log('currentTurn - ', currentTurn);
        const player = board.getPlayerById(currentTurn);
        return {
            ...state,
            currentPlayer: player,
        };
    }

    case GameActionTypes.UPDATE_CURRENT_PLAYER: {
        const currentTurn = board.getCurrentTurn();
        const player = board.getPlayerById(currentTurn);
        console.log('player1 - ', player);

        return {
            ...state,
            currentPlayer: player,
        };
    }
    case GameActionTypes.SET_ALL_PLAYERS: {
        const players = board.getPlayers();

        return {
            ...state,
            players: [...players],
        };
    }
    case GameActionTypes.SET_ACTIVE_PLAYERS: {
        const players = action.payload;
        console.log('playe!!!rs - ', players);

        return {
            ...state,
            activePlayers: players,
        };
    }
    case GameActionTypes.DELETE_ACTIVE_PLAYER: {
        const idPlayer = action.payload;

        return {
            ...state,
            activePlayers: state.activePlayers.filter(
                (player: TPlayer) => player.userId !== idPlayer,
            ),
        };
    }
    case GameActionTypes.ROLL_THE_DICE: {
        return {
            ...state,
            rollTheDice: [Util.randomNumber(), Util.randomNumber()],
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
    case GameActionTypes.END_GAME: {
        board.endGame();
        return {
            ...initialState,
        };
    }
    case GameActionTypes.OPEN_CARD_MODAL: {
        return {
            ...state,
            cardModalIsShow: true,
        };
    }
    case GameActionTypes.CLOSE_CARD_MODAL: {
        return {
            ...state,
            cardModalIsShow: false,
        };
    }
    case GameActionTypes.SET_CELL_IN_CARD_MODAL: {
        return {
            ...state,
            cellForModal: { ...action.payload },
        };
    }
    case GameActionTypes.ADD_NEW_GAME_CHAT_MESSAGE: {
        return {
            ...state,
            messages: [...state.messages, action.payload],
        };
    }
    default:
        return state;
    }
};
