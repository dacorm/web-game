import { Game } from '../../models/Game/Game';

export enum CreateGameActyonTypes {
  CREATE_GAME='CREATE_GAME'
}

export interface Games {
  games: Game []| []
}
