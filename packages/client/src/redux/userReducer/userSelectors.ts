import { AppStateType } from '../store';

export const getUserName = (state: AppStateType) => state.user.userName;
export const getEmail = (state: AppStateType) => state.user.email;
export const getId = (state: AppStateType) => state.user.id;
export const getIsLoggedInFlag = (state: AppStateType) => state.user.isLoggedIn;
