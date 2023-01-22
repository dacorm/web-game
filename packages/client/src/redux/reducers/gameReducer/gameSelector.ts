import { TPlayer } from '../../../pages/Game/Game.types';
import { AppStateType } from '../../store';
/** движется ли фишка прямо сейчас */
export const getCellIsMoving = (state: AppStateType): boolean => state.game.cellIsMoving;
/** получить игрока, к которому перешел ход */
export const getCurrentPlayer = (state: AppStateType): TPlayer => state.game.currentPlayer;
/** может ли игрок кинуть кубики */
export const getCanRollTheDice = (state: AppStateType): boolean => state.game.canRollTheDice;
/** показывать ли сцену экшена карточки */
export const getActionStarting = (state: AppStateType): boolean => state.game.actionStarting;
/** может ли игрок завершить ход */
export const getTurnCompleted = (state: AppStateType):boolean => state.game.turnCompleted;
