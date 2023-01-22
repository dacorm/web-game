import { Game } from '../../models/Game/Game';

export enum CreateGameActyonTypes {
  CREATE_GAME='CREATE_GAME',
  ADD_USER_TO_GAME='ADD_USER_TO_GAME'
}

export interface Games {
  games: Game []| []
}
