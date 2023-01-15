export interface userGame{
    cellIsMoving: boolean
    canRollTheDice: boolean
    currentPlayer: {
        displayName: string | null,
        userId: number | null
    }
    actionStarting: boolean
    turnCompleted: boolean
}

export enum GameActionTypes {
    CELL_START_MOVING = 'CELL_START_MOVING',
    CELL_STOP_MOVING = 'CELL_STOP_MOVING',
    SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER',
    ROLL_THE_DICE_TRUE = 'ROLL_THE_DICE_TRUE',
    ROLL_THE_DICE_FALSE = 'ROLL_THE_DICE_FALSE',
    ACTION_START = 'ACTION_START',
    ACTION_STOP = 'ACTION_STOP',
    TURN_START = 'TURN_START',
    TURN_STOP = 'TURN_STOP'
}