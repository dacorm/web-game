import { Dispatch } from 'redux';
import {
    CreateGameActyonTypes, Game, Message, MethodsMessages, Player, StatusesWS, TCreateGameAction,
} from '../types/createGameReducer.types';
import { GameAPI } from '../../api/WebSocket';

export const actionAddGame = (games:Game[]): TCreateGameAction => ({
    type: CreateGameActyonTypes.ADD_GAMES,
    payload: games,
});

export const addUserToGame = (gameId: number, user: Player): TCreateGameAction => ({
    type: CreateGameActyonTypes.ADD_USER_TO_GAME,
    payload: {
        gameId,
        user,
    },
});

export const setWsStatus = (status: StatusesWS):TCreateGameAction => {
    console.log('SET Status ws _________________________________________');
    return {
        type: CreateGameActyonTypes.SET_WS_STATUS,
        payload: status,
    };
};

let _newGamesHandler: ((msg: Message) => void)| null = null;

const newGamesHandlerCreator = (dispatch:Dispatch) => {
    if (_newGamesHandler == null) {
        _newGamesHandler = (msg: Message) => {
            switch (msg.method) {
            case MethodsMessages.addGame: {
                // @ts-ignore
                dispatch(actionAddGame(msg.games));
                break;
            }
            case MethodsMessages.addAllGames: {
                // @ts-ignore
                if (msg.games.length > 0) {
                    // @ts-ignore
                    dispatch(actionAddGame(msg.games));
                }

                break;
            }
            case MethodsMessages.addUser: {
                // @ts-ignore
                dispatch(addUserToGame(msg.gameId, msg.user));
                break;
            }
            default: break;
            }
        };
    }
    return _newGamesHandler;
};

let _newStatusHandler: ((status: StatusesWS) => void)| null = null;

const newStatusHandlerCreator = (dispatch:Dispatch) => {
    if (_newStatusHandler == null) {
        _newStatusHandler = (status) => {
            dispatch(setWsStatus(status));
        };
    }
    return _newStatusHandler;
};

export const startAddGameListening = () => async (dispatch:Dispatch) => {
    // запускаем WS
    GameAPI.start();
    GameAPI.subscribe('forMessages', newGamesHandlerCreator(dispatch));
    GameAPI.subscribe('forStatus', newStatusHandlerCreator(dispatch));
};

export const stopAddGameListening = () => async (dispatch:Dispatch) => {
    GameAPI.unsubscribe('forMessages', newGamesHandlerCreator(dispatch));
    GameAPI.unsubscribe('forStatus', newStatusHandlerCreator(dispatch));
    GameAPI.stop();
};

export const sendMessage = (msg:Message) => {
    GameAPI.sendMesseg(msg);
};
