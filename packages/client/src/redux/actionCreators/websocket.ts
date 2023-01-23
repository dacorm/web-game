import { TwebsocketAction, websocketActionTypes } from '../types/websocketReducer.types';

export const setWs = (ws:WebSocket):TwebsocketAction => ({
    type: websocketActionTypes.SET_WS,
    payload: ws,
});
