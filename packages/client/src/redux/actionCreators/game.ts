import { TGameChatMessage } from '../../components/Game/Chat/ChatBoard/ChatBoard.types';
import { GameActionTypes } from '../types/gameReducer.types';
/** сообщаем о начале передвижения фишки */
export const startCellMoving = () => ({
    type: GameActionTypes.CELL_START_MOVING,
});
/** сообщаем об остановке фишки */
export const stopCellMoving = () => ({
    type: GameActionTypes.CELL_STOP_MOVING,
});
/** устанавливаем игрока, к которому перешел ход */
export const setCurrentPlayer = () => ({
    type: GameActionTypes.SET_CURRENT_PLAYER,
});
/** инициализируем всех игроков */
export const setAllPlayers = () => ({
    type: GameActionTypes.SET_ALL_PLAYERS,
});
/** кидаем кубик */
export const rollTheDice = () => ({
    type: GameActionTypes.ROLL_THE_DICE,
});
/** разрешаем кидать кубик */
export const rollTheDiceTrue = () => ({
    type: GameActionTypes.ROLL_THE_DICE_TRUE,
});
/** запрещаем кидать кубик */
export const rollTheDiceFalse = () => ({
    type: GameActionTypes.ROLL_THE_DICE_FALSE,
});
/** показать экшен сцену карточки */
export const actionStart = () => ({
    type: GameActionTypes.ACTION_START,
});
/** убрать экшен сцену карточки */
export const actionStop = () => ({
    type: GameActionTypes.ACTION_STOP,
});
/** не допускаем к завершению ходу */
export const turnStart = () => ({
    type: GameActionTypes.TURN_START,
});
/** даем возможность игроку завершить ход */
export const turnStop = () => ({
    type: GameActionTypes.TURN_STOP,
});
/** завершить игру(очищение стора) */
export const endGame = () => ({
    type: GameActionTypes.END_GAME,
});
/** добавить событие в чат */
export const addNewGameChatMessage = (message: TGameChatMessage) => ({
    type: GameActionTypes.ADD_NEW_GAME_CHAT_MESSAGE,
    payload: message,
});
