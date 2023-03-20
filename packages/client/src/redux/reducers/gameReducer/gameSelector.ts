import { Cell } from '../../../models/Cell/Cell';
import { TGameChatMessage } from '../../../components/Game/Chat/ChatBoard/ChatBoard.types';
import { Player } from '../../../models/Player/Player';
import { AppStateType } from '../../store';
/** движется ли фишка прямо сейчас */
export const getCellIsMoving = (state: AppStateType): boolean => state.game.cellIsMoving;
/** получить игрока, к которому перешел ход */
export const getCurrentPlayer = (state: AppStateType): Player => state.game.currentPlayer;
/** получить всех игроков */
export const getAllPlayers = (state: AppStateType): Player[] => state.game.players;
/** получить значения кубиков */
export const getRollTheDice = (state: AppStateType): number[] => state.game.rollTheDice;
/** может ли игрок кинуть кубики */
export const getCanRollTheDice = (state: AppStateType): boolean => state.game.canRollTheDice;
/** показывать ли сцену экшена карточки */
export const getActionStarting = (state: AppStateType): boolean => state.game.actionStarting;
/** может ли игрок завершить ход */
export const getTurnCompleted = (state: AppStateType):boolean => state.game.turnCompleted;
/** открыта ли модалка с картой */
export const getStageModalCard = (state: AppStateType): boolean => state.game.cardModalIsShow;
/** получить ячейку для модалки */
export const getCellForModalCard = (state: AppStateType): Cell => state.game.cellForModal;
/** получить сообщения чата */
export const getGameChatMessages = (state: AppStateType):TGameChatMessage[] => state.game.messages;
