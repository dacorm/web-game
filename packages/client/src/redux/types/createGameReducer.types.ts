import { GamePlayer } from './gameReducer.types';

export enum CreateGameActyonTypes {
  ADD_GAMES='ADD_GAMES',
  ADD_USER_TO_GAME='ADD_USER_TO_GAME',
SET_WS_STATUS = 'SET_WS_STATUS',
__INIT__='__INIT__'
}

export enum MethodsMessages {
  addGame='addGame',
  addAllGames= 'addAllGames',
  connection = 'connection',
  addUser = 'addUser',
}

export type MethodsMessagesType = MethodsMessages.addGame | MethodsMessages.addAllGames | MethodsMessages.connection |MethodsMessages.addUser

export enum StatusWS {
  pending ='pending',
  ready = 'ready',
  error = 'error',
}

export type StatusesWS = StatusWS.pending | StatusWS.ready | StatusWS.error| null

export interface Message {
  gameId?: number
  method: MethodsMessagesType
  games?: []
  statusWS?: StatusesWS
  user?:GamePlayer
}

export interface Game {
  id: number,
    countPlayers: number,
  userCreater: GamePlayer,
  name: string,
    players:GamePlayer [ ]
}

export interface CreateGameReducerState {
  games: Game []| []
  statusWS: StatusesWS
}

type TCreateGameActionCreateGame = {
  type: CreateGameActyonTypes.ADD_GAMES,
  payload: Game[],
}

type TCreateGameActionAddUserToGame = {
  type: CreateGameActyonTypes.ADD_USER_TO_GAME,
  payload: {
    gameId: number,
    user: GamePlayer,
  },
}

type TCreateGameActionSetWsStatus = {
  type: CreateGameActyonTypes.SET_WS_STATUS,
  payload: StatusesWS,
}

type TCreateGameActionInitial = {
  type:CreateGameActyonTypes.__INIT__,

}

export type TCreateGameAction =
  TCreateGameActionCreateGame|
  TCreateGameActionInitial |
  TCreateGameActionAddUserToGame |
  TCreateGameActionSetWsStatus
