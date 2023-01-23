import { UserActionTypes, UserData } from './userReducer.types';

export enum websocketActionTypes {
  SET_WS = 'SET_WS'
}

export interface GameWebSocket {
 ws: WebSocket| null
}

type TActionSetWs = {
  type: websocketActionTypes.SET_WS
  payload: WebSocket
}

export type TwebsocketAction = TActionSetWs
