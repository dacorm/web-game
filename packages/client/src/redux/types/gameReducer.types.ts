export enum GameTypes {
  LOCAL='LOCAL',
  NETWORK = 'NETWORK'
}

export type GameType= GameTypes.LOCAL | GameTypes.NETWORK| undefined
export interface GamePlayer {
  currentPos?: number
  displayName: string
  userId: number
  avatar?: string
  color:string
}
export interface userGame{
    id: string| null
    type: GameType
    random: number[]
    cellIsMoving: boolean
    canRollTheDice: boolean
    currentPlayer: {
        displayName: string | null,
        userId: number | null
    }
    actionStarting: boolean
    turnCompleted: boolean
  players:GamePlayer[]
  isGameStarting: boolean
}

export enum GameActionTypes {
    CLEAN_GAME_DATA='CLEAN_GAME_DATA',
    START_GAME='START_GAME',
    SET_RANDOM='SET_RANDOM',
    SET_GAME_TYPE='SET_GAME_TYPE',
    SET_GAME_ID='SET_GAME_ID',
    SET_PLAYERS='SET_PLAYERS',
    CELL_START_MOVING = 'CELL_START_MOVING',
    CELL_STOP_MOVING = 'CELL_STOP_MOVING',
    SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER',
    ROLL_THE_DICE_TRUE = 'ROLL_THE_DICE_TRUE',
    ROLL_THE_DICE_FALSE = 'ROLL_THE_DICE_FALSE',
    ACTION_START = 'ACTION_START',
    ACTION_STOP = 'ACTION_STOP',
    TURN_START = 'TURN_START',
    TURN_STOP = 'TURN_STOP',
    ADD_PLAYER_CURRENT_POSITION='ADD_PLAYER_CURRENT_POSITION'
}
