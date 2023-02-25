import { GameActionTypes, GamePlayer } from '../types/gameReducer.types';
import { TGameChatMessage } from '../../components/Game/Chat/ChatBoard/ChatBoard.types';

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
/** добавить событие в чат */
export const addNewGameChatMessage = (message: TGameChatMessage) => ({
    type: GameActionTypes.ADD_NEW_GAME_CHAT_MESSAGE,
    payload: message,
});
/** УСТАНАВЛИВАЕМ ЗНАЧЕНИЯ ВЫПАВШИЕ НА КУБИКАХ */
export const setRandoms = (random:number[]) => ({
    type: GameActionTypes.SET_RANDOM,
    payload: random,
});
/** УСТАНАВЛИВАЕМ ЗНАЧЕНИЕ GameID */
export const setGameId = (id: number) => ({
    type: GameActionTypes.SET_GAME_ID,
    payload: id,
});

/** УСТАНАВЛИВАЕМ ЗНАЧЕНИЕ GameType */
export const setGameType = (type:string) => ({
    type: GameActionTypes.SET_GAME_TYPE,
    payload: type,
});

/** УСТАНАВЛИВАЕМ ИГРОКОВ */
export const setPlayers = (players:GamePlayer[]) => ({
    type: GameActionTypes.SET_PLAYERS,
    payload: players,
});

/** СООБЩАЕМ О СТАРТЕ ИГРЫ */
export const startGame = () => ({
    type: GameActionTypes.START_GAME,
});

/** ОЧИЩАЕМ ДАННЫЕ ИГРЫ - НУЖНО ЕСЛИ НАЧИНАЕМ НОВУЮ ИГРУ, А КЕШЕ СОДЕРЖАТЬСЯ ДАННЫЕ ОТ ПРЕДЫДУЩЕЙ */
export const cleanGameData = () => ({
    type: GameActionTypes.CLEAN_GAME_DATA,
});

export const addPlayerCurrentPosition = (data:{userId:number, currentPos:string}) => ({
    type: GameActionTypes.ADD_PLAYER_CURRENT_POSITION,
    payload: data,
});
